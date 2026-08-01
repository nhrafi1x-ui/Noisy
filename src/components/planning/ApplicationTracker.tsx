import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { Badge, GoldButton } from '../shared/UI';
import { Plus, Trash2, ExternalLink, Edit2, X, Check } from 'lucide-react';
import { format } from 'date-fns';

interface JobApp {
  id: string;
  company: string;
  role: string;
  date: string;
  link: string;
  status: 'Applied' | 'Interviewed' | 'Offer' | 'Rejected';
  userId: string;
}

const ApplicationTracker = () => {
  const { user } = useAuth();
  const [apps, setApps] = useState<JobApp[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ company: '', role: '', date: format(new Date(), 'yyyy-MM-dd'), link: '', status: 'Applied' as any });

  useEffect(() => {
    if (!user) return;
    const path = 'applications';
    const q = query(collection(db, path), where('userId', '==', user.uid));
    return onSnapshot(q, (snapshot) => {
      setApps(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as JobApp)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  }, [user]);

  const addApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const path = 'applications';
    try {
      await addDoc(collection(db, path), { ...formData, userId: user.uid });
      setIsAdding(false);
      setFormData({ company: '', role: '', date: format(new Date(), 'yyyy-MM-dd'), link: '', status: 'Applied' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const deleteApp = async (id: string) => {
    const path = `applications/${id}`;
    try {
      await deleteDoc(doc(db, 'applications', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    const path = `applications/${id}`;
    try {
      await updateDoc(doc(db, 'applications', id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Offer': return 'green';
      case 'Rejected': return 'red';
      case 'Interviewed': return 'orange';
      default: return 'gold';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-2xl sm:text-3xl font-serif">Pursuit Tracker</h3>
        <GoldButton onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2 text-xs sm:text-sm">
          {isAdding ? <X size={18} /> : <Plus size={18} />}
          {isAdding ? 'Cancel' : 'Register Pursuit'}
        </GoldButton>
      </div>

      {isAdding && (
        <form onSubmit={addApp} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 bg-cream p-4 sm:p-6 border border-gold/10">
          <input className="bg-white border border-charcoal/10 p-3 font-serif text-sm outline-none" placeholder="Company" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required />
          <input className="bg-white border border-charcoal/10 p-3 font-serif text-sm outline-none" placeholder="Role" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required />
          <input type="date" className="bg-white border border-charcoal/10 p-3 font-mono text-xs outline-none" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
          <input className="bg-white border border-charcoal/10 p-3 font-serif text-sm outline-none" placeholder="Link" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
          <button type="submit" className="bg-charcoal text-gold p-3 uppercase tracking-widest text-xs font-mono font-bold hover:bg-gold hover:text-white transition-all sm:col-span-2 md:col-span-1">Submit</button>
        </form>
      )}

      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <table className="w-full border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-charcoal/10 text-left">
              <th className="py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/40">Company</th>
              <th className="py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/40">Role</th>
              <th className="py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/40">Date</th>
              <th className="py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/40">Status</th>
              <th className="py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/40 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/5">
            {apps.map(app => (
              <tr key={app.id} className="group hover:bg-white/50 transition-colors">
                <td className="py-4 pr-4 font-serif text-base sm:text-xl">{app.company}</td>
                <td className="py-4 px-4 font-serif text-sm sm:text-base text-charcoal/70">{app.role}</td>
                <td className="py-4 px-4 font-mono text-xs">{app.date}</td>
                <td className="py-4 px-4">
                  <select 
                    value={app.status}
                    onChange={(e) => updateStatus(app.id, e.target.value)}
                    className={`bg-transparent border-none outline-none font-mono text-[10px] uppercase tracking-widest font-bold cursor-pointer transition-colors ${getStatusColor(app.status) === 'red' ? 'text-red-500' : getStatusColor(app.status) === 'green' ? 'text-green-500' : getStatusColor(app.status) === 'orange' ? 'text-orange-500' : 'text-gold'}`}
                  >
                    {['Applied', 'Interviewed', 'Offer', 'Rejected'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="py-4 pl-4 text-right">
                  <div className="flex justify-end gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    {app.link && <a href={app.link} target="_blank" rel="noreferrer" className="text-charcoal/50 hover:text-gold transition-colors p-1" aria-label="Open link"><ExternalLink size={16} /></a>}
                    <button onClick={() => deleteApp(app.id)} className="text-charcoal/50 hover:text-red-500 transition-colors p-1" aria-label="Delete app"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {apps.length === 0 && (
          <div className="text-center py-20 text-charcoal/30 font-serif italic border-b border-charcoal/5">No active pursuits recorded.</div>
        )}
      </div>
    </div>
  );
};

export default ApplicationTracker;
