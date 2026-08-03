export const seedData = {
  projects: [
    {
      id: 'proj-firee',
      title: 'Firee',
      description: 'A modern web application built and deployed with high efficiency, featuring dynamic interactive modules and real-time backend synchronization.',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
      techTags: ['React', 'TypeScript', 'Tailwind', 'Vercel'],
      liveLink: 'https://firee.vercel.app',
      repoLink: 'https://github.com/nhrafi0x/Firee',
      featured: true
    },
    {
      id: 'proj1',
      title: 'Architectural Visualization Engine',
      description: 'A high-performance 3D rendering pipeline built with React and Three.js, focusing on minimalist interior designs.',
      imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
      techTags: ['React', 'Three.js', 'Vite', 'Tailwind'],
      liveLink: 'https://github.com/nhrafi0x',
      repoLink: 'https://github.com/nhrafi0x',
      featured: true
    },
    {
      id: 'proj2',
      title: 'Luxury Estate Platform',
      description: 'Full-stack real estate application with real-time bidding and sophisticated filtering for luxury properties.',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6191bcbe10?auto=format&fit=crop&q=80&w=800',
      techTags: ['Next.js', 'Firebase', 'Stripe'],
      liveLink: 'https://github.com/nhrafi0x',
      repoLink: 'https://github.com/nhrafi0x',
      featured: true
    },
    {
      id: 'proj3',
      title: 'AI Neural Optimization Suite',
      description: 'A lightweight machine learning benchmark suite designed for model quantization and low-power IoT deployment.',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      techTags: ['Python', 'PyTorch', 'TensorFlow', 'CUDA'],
      liveLink: 'https://github.com/nhrafi0x',
      repoLink: 'https://github.com/nhrafi0x',
      featured: true
    },
    {
      id: 'proj4',
      title: 'Tactile Nothing-OS Component Kit',
      description: 'Custom React design system inspired by translucent hardware, dot-matrix typography, and micro-animations.',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
      techTags: ['React', 'Framer Motion', 'Tailwind', 'Design System'],
      liveLink: 'https://github.com/nhrafi0x',
      repoLink: 'https://github.com/nhrafi0x',
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
      date: '2023-11-15',
      imageUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'res2',
      title: 'Lightweight Deep Learning for Real-Time Computer Vision',
      authors: 'Nazmul Haque Rafi, et al.',
      journal: 'IEEE AI & Vision Conference',
      status: 'Under Review',
      abstract: 'An architectural review of pruning algorithms and hyperparameter tuning methods optimized for low-latency visual detection.',
      date: '2024-03-10',
      imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800'
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
    },
    {
      id: 'photo3',
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
      category: 'Architecture',
      camera: 'Fujifilm X-T4',
      settings: 'f/5.6, 1/250s, ISO 200',
      title: 'Architectural Geometry'
    },
    {
      id: 'photo4',
      url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
      category: 'Street',
      camera: 'Leica Q2',
      settings: 'f/1.7, 1/1000s, ISO 100',
      title: 'Urban Reflections'
    },
    {
      id: 'photo5',
      url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800',
      category: 'Landscape',
      camera: 'Sony A7R IV',
      settings: 'f/8.0, 1/60s, ISO 100',
      title: 'Misty Horizon'
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
    },
    {
      id: 'recipe2',
      title: 'Artisanal Sourdough & Roasted Garlic',
      ingredients: ['Wild Yeast Starter', 'Unbleached Flour', 'Sea Salt', 'Roasted Garlic', 'Extra Virgin Olive Oil'],
      steps: ['Autolyse flour and water', 'Bulk fermentation with stretch-and-folds', 'Shape and cold proof overnight', 'Bake in Dutch oven'],
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
      isChefSpecial: false
    },
    {
      id: 'recipe3',
      title: 'Pan-Seared A5 Wagyu Ribeye',
      ingredients: ['A5 Wagyu Ribeye', 'Flaky Sea Salt', 'Thyme', 'Garlic', 'Compound Butter'],
      steps: ['Sear on high cast iron', 'Baste with rosemary butter', 'Rest for 5 minutes', 'Slice thinly across grain'],
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
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

