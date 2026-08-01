import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { Badge, GoldButton } from '../shared/UI';
import { Plus, Trash2, ExternalLink, Bookmark, Search } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Note {
  id: string;
  title: string;
  url: string;
  content: string;
  userId: string;
}

const NotesSaver = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: '', url: '', content: '' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!user) return;
    const path = 'notes';
    const q = query(
      collection(db, path), 
      where('userId', '==', user.uid), 
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
      setNotes(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Note)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  }, [user]);

  const addNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const path = 'notes';
    try {
      await addDoc(collection(db, path), { ...formData, userId: user.uid, createdAt: serverTimestamp() });
      setIsAdding(false);
      setFormData({ title: '', url: '', content: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const deleteNote = async (id: string) => {
    const path = `notes/${id}`;
    try {
      await deleteDoc(doc(db, 'notes', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const filteredNotes = notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <h3 className="text-2xl sm:text-3xl font-serif">Knowledge Base</h3>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1 sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30" />
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search concepts..."
              className="w-full bg-white border border-charcoal/10 pl-10 pr-4 py-2 font-serif text-sm outline-none focus:border-gold"
            />
          </div>
          <GoldButton onClick={() => setIsAdding(!isAdding)} className="flex items-center justify-center gap-2 text-xs sm:text-sm">
            {isAdding ? 'Cancel' : 'Anchor Note'}
          </GoldButton>
        </div>
      </div>

      {isAdding && (
        <form onSubmit={addNote} className="space-y-4 bg-cream p-4 sm:p-8 border border-gold/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <input className="bg-white border border-charcoal/10 p-3 font-serif text-sm outline-none" placeholder="Resource Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            <input className="bg-white border border-charcoal/10 p-3 font-mono text-xs outline-none" placeholder="Reference URL (Optional)" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} />
          </div>
          <textarea 
            className="w-full bg-white border border-charcoal/10 p-4 font-serif text-sm sm:text-base outline-none h-32 sm:h-40 resize-none focus:border-gold"
            placeholder="Distill the essence... (Markdown supported)"
            value={formData.content}
            onChange={e => setFormData({...formData, content: e.target.value})}
            required
          />
          <button type="submit" className="w-full bg-charcoal text-gold p-3.5 sm:p-4 uppercase tracking-[0.2em] sm:tracking-[0.4em] text-xs font-mono font-bold hover:bg-gold hover:text-white transition-all">Crystalize Note</button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {filteredNotes.map(note => (
          <div key={note.id} className="deco-card p-5 sm:p-8 md:p-10 group flex flex-col">
            <div className="flex justify-between items-start mb-4 sm:mb-6">
              <Bookmark className="text-gold shrink-0" size={20} />
              <button onClick={() => deleteNote(note.id)} className="text-charcoal/30 hover:text-red-500 transition-colors p-1" aria-label="Delete note"><Trash2 size={18} /></button>
            </div>
            <h4 className="text-xl sm:text-2xl font-serif mb-3 sm:mb-4 group-hover:text-gold transition-colors">{note.title}</h4>
            <div className="markdown-body text-charcoal/60 font-serif line-clamp-4 flex-1 text-sm sm:text-base">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </div>
            {note.url && (
              <a href={note.url} target="_blank" rel="noreferrer" className="mt-6 sm:mt-8 pt-4 border-t border-gold/10 flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-charcoal/40 hover:text-gold transition-colors">
                <ExternalLink size={14} /> View Reference
              </a>
            )}
          </div>
        ))}
        {filteredNotes.length === 0 && (
          <div className="col-span-full text-center py-24 text-charcoal/30 font-serif italic">Your digital library is currently silent.</div>
        )}
      </div>
    </div>
  );
};

export default NotesSaver;
