import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { GoldButton, Badge } from '../components/shared/UI';
import { Plus, Trash2, Calendar, Tag, MessageSquare, Send, X, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import SEO from '../components/shared/SEO';
import NextPage from '../components/shared/NextPage';

interface Post {
  id: string;
  title: string;
  content: string;
  tags: string[];
  imageUrl?: string;
  createdAt: any;
  userId: string;
}

const MyThinkingPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', tags: '', imageUrl: '' });
  const isOwner = user?.email === 'nhrafi1x@gmail.com';

  useEffect(() => {
    const path = 'posts';
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Post)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOwner) return;
    const path = 'posts';
    try {
      await addDoc(collection(db, path), {
        title: formData.title,
        content: formData.content,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        imageUrl: formData.imageUrl,
        userId: user.uid,
        createdAt: serverTimestamp()
      });
      setIsAdding(false);
      setFormData({ title: '', content: '', tags: '', imageUrl: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const deletePost = async (id: string) => {
    if (!isOwner) return;
    const path = `posts/${id}`;
    try {
      await deleteDoc(doc(db, 'posts', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "My Thinking - NH Rafi",
    "description": "A collection of thoughts, articles, and explorations by Nazmul Haque Rafi.",
    "author": {
      "@type": "Person",
      "name": "Nazmul Haque Rafi"
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-20 py-12 px-4">
      <SEO 
        title="My Thinking" 
        description="Explore the thoughts, articles, and technical explorations of Nazmul Haque Rafi. A deep dive into software architecture, AI, and creative philosophy."
        keywords="Blog, Thinking, Articles, Software Architecture, AI Research, Philosophy"
        schemaData={blogSchema}
      />

      <header className="relative space-y-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block"
        >
          <Badge text="Intellectual Journal" />
        </motion.div>
        <h1 className="text-7xl font-serif tracking-tight text-charcoal">My Thinking</h1>
        <p className="text-charcoal/60 font-serif italic max-w-2xl mx-auto text-xl leading-relaxed">
          "Architecture is not just about buildings, but about the structure of our thoughts and the systems we inhabit."
        </p>

        {isOwner && (
          <div className="pt-8">
            <GoldButton onClick={() => setIsAdding(true)} className="flex items-center gap-2 mx-auto">
              <Plus size={20} />
              Chronicle a New Thought
            </GoldButton>
          </div>
        )}
      </header>

      <section className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-16">
          <AnimatePresence mode="popLayout">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white p-8 md:p-12 border border-charcoal/5 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                {/* Deco Background Text */}
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none select-none">
                  <span className="text-8xl font-serif">{index + 1}</span>
                </div>

                <div className="flex flex-col md:flex-row gap-12">
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-gold/80">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.createdAt?.toDate ? new Date(post.createdAt.toDate()).toLocaleDateString() : 'Draft'}
                      </span>
                      {post.tags?.length > 0 && (
                        <span className="flex items-center gap-1">
                          <Tag size={14} />
                          {post.tags[0]}
                        </span>
                      )}
                    </div>

                    <h2 className="text-4xl font-serif text-charcoal group-hover:text-gold transition-colors duration-300 leading-tight">
                      {post.title}
                    </h2>

                    <div className="prose prose-stone max-w-none prose-p:font-serif prose-p:italic prose-p:text-charcoal/80">
                      <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>

                    <div className="flex items-center justify-between pt-8 border-t border-charcoal/5">
                      <div className="flex gap-2">
                        {post.tags?.map(tag => (
                          <span key={tag} className="text-[10px] uppercase tracking-widest bg-gold/5 px-2 py-1 text-gold">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {isOwner && (
                        <button 
                          onClick={() => deletePost(post.id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 transition-all rounded-full"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </div>

                  {post.imageUrl && (
                    <div className="md:w-1/3 h-64 md:h-auto overflow-hidden border border-gold/10">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>

          {posts.length === 0 && (
            <div className="text-center py-20 bg-charcoal/5 border border-dashed border-charcoal/10">
              <p className="text-charcoal/40 font-serif italic">The architect is silent... for now.</p>
            </div>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="sticky top-24 space-y-8">
            <div className="bg-cream p-8 border border-gold/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/20 -translate-x-1 translate-y-1" />
              <h3 className="text-xl font-serif mb-4">Thinking in Architecture</h3>
              <p className="text-sm text-charcoal/70 font-serif italic leading-relaxed">
                A repository of technical insights and philosophical reflections on the intersection of code, space, and human interaction.
              </p>
            </div>

            <div className="bg-white p-8 border border-charcoal/5 uppercase tracking-[0.2em] text-[10px]">
              <h4 className="text-gold mb-4 mb-6">Archive Segments</h4>
              <ul className="space-y-4">
                {['Meta-Analysis', 'Systemic Flux', 'Digital Tectonics', 'User Phenomenology'].map(tag => (
                  <li key={tag} className="flex items-center justify-between hover:text-gold transition-colors cursor-pointer group">
                    <span>{tag}</span>
                    <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </section>

      {/* Post Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="absolute inset-0 bg-charcoal/90 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-cream p-12 shadow-2xl border border-gold/30 overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsAdding(false)}
                className="absolute top-6 right-6 p-2 text-charcoal/50 hover:text-charcoal transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="text-4xl font-serif mb-12 text-charcoal">Chronicle Your Thoughts</h2>

              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-charcoal/50 mb-2">Article Title</label>
                    <input 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-white border border-charcoal/10 p-4 focus:ring-1 focus:ring-gold outline-none transition-all font-serif italic text-lg"
                      placeholder="The Dialectics of Spacial Code..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-charcoal/50 mb-2">Meta Tags (comma separated)</label>
                    <input 
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      className="w-full bg-white border border-charcoal/10 p-4 focus:ring-1 focus:ring-gold outline-none font-mono text-sm"
                      placeholder="architecture, ai, systems"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-charcoal/50 mb-2">Cover Imagery URL</label>
                    <input 
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                      className="w-full bg-white border border-charcoal/10 p-4 focus:ring-1 focus:ring-gold outline-none font-mono text-xs"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                </div>

                <div className="space-y-6 flex flex-col">
                  <div className="flex-1">
                    <label className="block text-xs uppercase tracking-widest text-charcoal/50 mb-2">Content (Markdown Supported)</label>
                    <textarea 
                      required
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      className="w-full h-80 bg-white border border-charcoal/10 p-6 focus:ring-1 focus:ring-gold outline-none font-serif text-lg leading-relaxed resize-none"
                      placeholder="Transcribe your insights here..."
                    />
                  </div>
                  <GoldButton type="submit" className="w-full py-5 text-lg flex items-center justify-center gap-3">
                    <Send size={20} />
                    Publish to thinking
                  </GoldButton>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <NextPage to="/contact" label="Contact Me" />
    </div>
  );
};

export default MyThinkingPage;
