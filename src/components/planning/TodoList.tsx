import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { Badge, GoldButton } from '../shared/UI';
import { Trash2, CheckCircle2, Circle, Plus, GripVertical } from 'lucide-react';
import { motion, Reorder } from 'motion/react';

interface Todo {
  id: string;
  text: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  userId: string;
}

const TodoList = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  useEffect(() => {
    if (!user) return;
    const path = 'todos';
    const q = query(
      collection(db, path),
      where('userId', '==', user.uid)
    );
    return onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Todo)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  }, [user]);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim() || !user) return;
    const path = 'todos';
    try {
      await addDoc(collection(db, path), {
        text: newTodo,
        priority,
        completed: false,
        userId: user.uid,
        createdAt: Date.now()
      });
      setNewTodo('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    const path = `todos/${id}`;
    try {
      await updateDoc(doc(db, 'todos', id), { completed: !completed });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const deleteTodo = async (id: string) => {
    const path = `todos/${id}`;
    try {
      await deleteDoc(doc(db, 'todos', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-12">
      <form onSubmit={addTodo} className="space-y-4 bg-cream p-4 sm:p-8 border border-gold/10">
        <h3 className="text-xl sm:text-2xl font-serif mb-2 sm:mb-4">Strategic Tasks</h3>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <input 
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Identify a new objective..."
            className="flex-1 bg-white border border-charcoal/10 p-3 sm:p-4 font-serif text-sm sm:text-base outline-none focus:border-gold"
          />
          <div className="flex gap-2">
            <select 
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="flex-1 sm:flex-none bg-white border border-charcoal/10 px-3 sm:px-4 py-3 font-mono text-xs uppercase tracking-widest outline-none focus:border-gold"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button type="submit" className="bg-charcoal text-gold p-3 sm:p-4 hover:bg-gold hover:text-white transition-colors" aria-label="Add task">
              <Plus size={20} />
            </button>
          </div>
        </div>
      </form>

      <div className="space-y-3 sm:space-y-4">
        {todos.sort((a,b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1)).map((todo) => (
          <motion.div 
            layout
            key={todo.id}
            className={`flex items-center gap-3 sm:gap-6 p-4 sm:p-6 bg-white border-l-4 transition-all duration-300 ${todo.completed ? 'opacity-50 border-gray-300 shadow-none' : 'shadow-sm hover:shadow-md border-gold'}`}
          >
            <button onClick={() => toggleTodo(todo.id, todo.completed)} className="text-gold transition-transform hover:scale-110 active:scale-95 shrink-0" aria-label="Toggle completion">
              {todo.completed ? <CheckCircle2 size={20} className="sm:w-6 sm:h-6" /> : <Circle size={20} className="sm:w-6 sm:h-6" />}
            </button>
            <div className="flex-1 min-w-0">
              <div className={`text-base sm:text-xl font-serif break-words ${todo.completed ? 'line-through decoration-gold/30' : ''}`}>{todo.text}</div>
              <Badge color={todo.priority === 'High' ? 'red' : todo.priority === 'Medium' ? 'orange' : 'green'} className="mt-1.5 text-[8px]">
                {todo.priority} Priority
              </Badge>
            </div>
            <button onClick={() => deleteTodo(todo.id)} className="text-charcoal/30 hover:text-red-500 transition-colors p-1 shrink-0" aria-label="Delete todo">
              <Trash2 size={18} />
            </button>
          </motion.div>
        ))}
        {todos.length === 0 && (
          <div className="text-center py-20 text-charcoal/30 font-serif italic">Your task list remains pristine. Add an objective to begin.</div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
