export const seedData = {
  projects: [
    {
      id: 'proj1',
      title: 'Architectural Visualization Engine',
      description: 'A high-performance 3D rendering pipeline built with React and Three.js, focusing on minimalist interior designs.',
      imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
      techTags: ['React', 'Three.js', 'Vite', 'Tailwind'],
      liveLink: '#',
      repoLink: '#',
      featured: true
    },
    {
      id: 'proj2',
      title: 'Luxury Estate Platform',
      description: 'Full-stack real estate application with real-time bidding and sophisticated filtering for luxury properties.',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6191bcbe10?auto=format&fit=crop&q=80&w=800',
      techTags: ['Next.js', 'Firebase', 'Stripe'],
      liveLink: '#',
      repoLink: '#',
      featured: true
    }
  ],
  research: [
    {
      id: 'res1',
      title: 'Optimization of Neural Networks for Low-Power Devices',
      authors: 'Nazmul Haque Rafi, et al.',
      journal: 'International Journal of AI Research',
      status: 'Published',
      abstract: 'This paper explores novel compression techniques for deep learning models to enable high-accuracy inference on mobile and IoT hardware.',
      date: '2023-11-15'
    }
  ],
  photography: [
    {
      id: 'photo1',
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
      category: 'Street',
      camera: 'Fujifilm X-T4',
      settings: 'f/2.8, 1/500s, ISO 400',
      title: 'Monochrome Echoes'
    },
    {
      id: 'photo2',
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
      category: 'Nature',
      camera: 'Sony A7R IV',
      settings: 'f/11, 1/125s, ISO 100',
      title: 'Golden Hour'
    }
  ],
  cooking: [
    {
      id: 'recipe1',
      title: 'Authentic Truffle Risotto',
      ingredients: ['Arborio Rice', 'Fresh Black Truffle', 'Parmesan', 'Shallots', 'White Wine'],
      steps: ['Sauté shallots in butter', 'Toast rice', 'Deglaze with wine', 'Add warm broth slowly', 'Finish with truffle and cheese'],
      imageUrl: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800',
      isChefSpecial: true
    }
  ],
  freelanceHistory: [
    {
      id: 'fh1',
      client: 'LuxInterior Tokyo',
      service: '3D Scene Design',
      earnings: 450,
      rating: 5,
      date: '2024-01-20',
      badge: 'Top Rated'
    }
  ]
};
