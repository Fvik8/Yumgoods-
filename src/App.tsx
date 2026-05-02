import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Search, Menu, X, Plus, Instagram, Facebook, Twitter, ShieldCheck, Leaf, Users, ArrowRight } from 'lucide-react';

// --- Types ---
interface Story {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  image: string;
  content: string[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
}

interface CartItem extends Product {
  quantity: number;
}

// --- Data ---
const STORIES: Story[] = [
  {
    id: 'weaving',
    title: "The Weaver's Hand",
    subtitle: "A journey through the raw wool of the Pyrenees",
    author: "Elena Moretti",
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=1200",
    content: [
      "In the high valleys of the Pyrenees, the air is thin and the silence is heavy. This is where our Raw Wool Throw begins. It is the life's work of artisans who have lived in rhythm with the seasons for generations.",
      "The wool is never bleached, never processed with harsh chemicals. It retains the natural oils and the slight variations in color that make each piece unique. It is a dialogue between the sheep, the weather, and the loom.",
      "When you touch a Yum Goods textile, you are touching the legacy of the mountain. You are feeling the weight of centuries of craft, distilled into a single, soft wrap for your home."
    ]
  },
  {
    id: 'ceramics',
    title: "Form follows Fire",
    subtitle: "The alchemy of earth and heat in the Sabi series",
    author: "Marco Rossi",
    image: "https://images.unsplash.com/photo-1565191999001-551c187427bb?auto=format&fit=crop&q=80&w=1200",
    content: [
      "Earth is stubborn. It resists the hand until it is understood. In the workshop of Marco Rossi, the clay is allowed to speak for itself. The 'Sabi' series celebrates the beauty of the incomplete.",
      "Each vase spends forty-eight hours in a wood-fired kiln. The ash from the wood falls onto the glaze, creating unpredictable textures and obsidian-like streaks. No two are ever the same, nor should they be.",
      "We believe that a home is a collection of imperfections. These ceramics are not just vessels; they are witnesses to the transformative power of fire and the patient hands that guide it."
    ]
  }
];

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Sabi Ceramic Vase",
    price: 145,
    image: "/src/assets/images/regenerated_image_1777743854886.png",
    category: "Ceramics",
    badge: "Handmade"
  },
  {
    id: 2,
    name: "Oak Lounge Chair",
    price: 890,
    image: "/src/assets/images/regenerated_image_1777743856377.png",
    category: "Furniture",
    badge: "Limited Edition"
  },
  {
    id: 3,
    name: "Raw Wool Throw",
    price: 180,
    image: "/src/assets/images/regenerated_image_1777743858325.png",
    category: "Textiles",
    badge: "Eco-friendly"
  },
  {
    id: 4,
    name: "Hand-carved Bowl",
    price: 95,
    image: "/src/assets/images/regenerated_image_1777743860129.png",
    category: "Kitchen",
    badge: "Handmade"
  },
  {
    id: 5,
    name: "Minimalist Pendant",
    price: 320,
    image: "/src/assets/images/regenerated_image_1777743861295.png",
    category: "Lighting",
    badge: "Artist Series"
  },
  {
    id: 6,
    name: "Stone Incense Burner",
    price: 65,
    image: "/src/assets/images/regenerated_image_1777743862224.png",
    category: "Aroma",
    badge: "Bestseller"
  }
];

// --- Components ---

const TopBanner = () => (
  <div className="bg-offblack text-white py-2 px-4 text-center text-[10px] sm:text-xs tracking-widest uppercase font-medium">
    Free Carbon-Neutral Shipping on orders over €100
  </div>
);

const Header = ({ 
  cartCount, 
  onCartClick,
  onStoryClick,
  onSearchClick
}: { 
  cartCount: number; 
  onCartClick: () => void;
  onStoryClick: () => void;
  onSearchClick: () => void;
}) => (
  <header className="sticky top-0 z-40 bg-cream/80 backdrop-blur-md border-b border-offblack/10">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <nav className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-widest font-bold">
        <a href="#shop" className="hover:text-terracotta transition-colors">Shop</a>
        <a href="#artists" className="hover:text-terracotta transition-colors">Artists</a>
        <button onClick={onStoryClick} className="hover:text-terracotta transition-colors uppercase">Story</button>
      </nav>
      
      <div className="flex-1 md:text-center text-left">
        <h1 className="text-2xl sm:text-3xl font-serif italic tracking-tighter">Yum Goods</h1>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <button 
          onClick={onSearchClick}
          className="hover:text-terracotta transition-colors hidden sm:block"
        >
          <Search size={18} strokeWidth={1.5} />
        </button>
        <button 
          className="relative hover:text-terracotta transition-colors flex items-center gap-2"
          onClick={onCartClick}
        >
          <ShoppingCart size={18} strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-terracotta text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] uppercase tracking-widest font-bold hidden sm:block">Cart</span>
        </button>
        <button className="md:hidden">
          <Menu size={18} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative h-[85vh] sm:h-[90vh] overflow-hidden flex items-center justify-center px-6">
    <motion.div 
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.8, ease: "easeOut" }}
      className="absolute inset-0"
    >
      <img 
        src="/src/assets/images/regenerated_image_1777743747430.png" 
        alt="Minimalist interior"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-offblack/5" />
    </motion.div>
    
    <div className="relative z-10 text-center max-w-4xl px-4">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 1, ease: [0.2, 1, 0.3, 1] }}
      >
        <h2 className="text-5xl sm:text-7xl md:text-9xl mb-8 leading-[1.1] font-serif italic text-offblack tracking-tight">
          Objects with Soul.
        </h2>
        <button className="px-12 py-5 bg-terracotta text-white uppercase text-[10px] tracking-[0.3em] font-bold hover:bg-offblack transition-all duration-700 transform hover:-translate-y-1 shadow-2xl">
          Explore the Collection
        </button>
      </motion.div>
    </div>
  </section>
);

interface ProductCardProps {
  product: Product;
  onAdd: (p: Product) => void;
  key?: number;
}

const ProductCard = ({ product, onAdd }: ProductCardProps) => (
  <motion.div 
    initial={{ y: 60, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="group flex flex-col"
  >
    <div className="relative aspect-[3/4] overflow-hidden bg-stone-50 border border-offblack/5">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      
      {product.badge && (
        <div className="absolute top-4 left-4 bg-cream/90 backdrop-blur-sm px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] font-bold border border-offblack/10">
          {product.badge}
        </div>
      )}
      
      <div className="absolute inset-0 bg-offblack/0 group-hover:bg-offblack/5 transition-colors duration-500" />
      
      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <button 
          onClick={() => onAdd(product)}
          className="w-full py-4 bg-offblack text-white text-[10px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-2 hover:bg-terracotta transition-colors shadow-lg"
        >
          <Plus size={14} /> Quick Add
        </button>
      </div>
    </div>
    
    <div className="pt-6 flex flex-col gap-1.5">
      <span className="text-[10px] uppercase tracking-[0.3em] text-offblack/40 font-bold">{product.category}</span>
      <div className="flex justify-between items-baseline">
        <h3 className="text-xl font-serif italic group-hover:text-terracotta transition-colors">{product.name}</h3>
        <span className="text-sm font-medium tracking-tight">€{product.price}</span>
      </div>
    </div>
  </motion.div>
);

const ArtistExperience = ({ onReadStory }: { onReadStory: () => void }) => (
  <section id="artists" className="bg-artist-bg py-24 sm:py-48 mt-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 sm:gap-24 items-center">
        <motion.div 
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1541944743827-e04aa6427c33?auto=format&fit=crop&q=80&w=1200" 
            alt="The Artisan Workspace"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <motion.div 
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <span className="text-xs uppercase tracking-[0.4em] font-bold text-terracotta mb-8 block">The Soul of Craft</span>
          <h2 className="text-4xl sm:text-6xl font-serif italic mb-8 leading-[1.1] text-offblack">"Every piece holds the breath of its creator."</h2>
          <p className="text-offblack/70 mb-12 text-base sm:text-lg leading-relaxed font-light">
            We partner with independent makers who refuse to compromise. Their hands breathe life into wood, clay, and fiber, creating objects that age gracefully alongside your memories.
          </p>
          <button 
            onClick={onReadStory}
            className="flex items-center gap-6 text-xs uppercase tracking-[0.4em] font-bold border-b-2 border-offblack pb-3 hover:text-terracotta hover:border-terracotta transition-all group"
          >
            Read their Story <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  </section>
);

const EthicsSection = () => (
  <section className="bg-cream py-20 border-y border-offblack/10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-16 text-center">
        <motion.div 
          whileHover={{ y: -5 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-16 h-16 rounded-full bg-artist-bg flex items-center justify-center text-terracotta">
            <Leaf size={28} strokeWidth={1} />
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-2">100% Eco-friendly</h4>
            <p className="text-[10px] text-offblack/50 uppercase tracking-[0.2em] max-w-[200px] mx-auto leading-relaxed">Responsibly Sourced & Handed Down</p>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-16 h-16 rounded-full bg-artist-bg flex items-center justify-center text-terracotta">
            <Users size={28} strokeWidth={1} />
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-2">Support Individual Artisans</h4>
            <p className="text-[10px] text-offblack/50 uppercase tracking-[0.2em] max-w-[200px] mx-auto leading-relaxed">Direct Profit Sharing for Every Piece</p>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-16 h-16 rounded-full bg-artist-bg flex items-center justify-center text-terracotta">
            <ShieldCheck size={28} strokeWidth={1} />
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-2">Plastic-free Promise</h4>
            <p className="text-[10px] text-offblack/50 uppercase tracking-[0.2em] max-w-[200px] mx-auto leading-relaxed">Recycled & Compostable Packaging</p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-cream pt-32 pb-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16 mb-24">
        <div className="col-span-1 sm:col-span-2 md:col-span-1">
          <h1 className="text-3xl font-serif italic mb-8">Yum Goods</h1>
          <p className="text-xs text-offblack/50 leading-loose uppercase tracking-[0.3em]">
            Objects that resonate. <br /> Curated with intent for <br /> slower living.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.4em] font-bold mb-8 text-offblack">Shop</h4>
          <ul className="flex flex-col gap-5 text-xs text-offblack/70 font-medium tracking-widest uppercase">
            <li><a href="#" className="hover:text-terracotta transition-colors">Ceramics</a></li>
            <li><a href="#" className="hover:text-terracotta transition-colors">Furniture</a></li>
            <li><a href="#" className="hover:text-terracotta transition-colors">Textiles</a></li>
            <li><a href="#" className="hover:text-terracotta transition-colors">Lighting</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.4em] font-bold mb-8 text-offblack">Explore</h4>
          <ul className="flex flex-col gap-5 text-xs text-offblack/70 font-medium tracking-widest uppercase">
            <li><a href="#" className="hover:text-terracotta transition-colors">Artisans</a></li>
            <li><a href="#" className="hover:text-terracotta transition-colors">Our Ethos</a></li>
            <li><a href="#" className="hover:text-terracotta transition-colors">Journal</a></li>
            <li><a href="#" className="hover:text-terracotta transition-colors">Store Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.4em] font-bold mb-8 text-offblack">Join Us</h4>
          <p className="text-xs text-offblack/50 mb-8 font-medium tracking-widest uppercase leading-loose">Updates on new releases <br /> and artist stories.</p>
          <div className="flex border-b border-offblack/20 pb-4">
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="bg-transparent flex-1 text-[10px] outline-none uppercase tracking-[0.4em] placeholder:text-offblack/30"
            />
            <button className="uppercase text-[10px] font-bold tracking-[0.4em] hover:text-terracotta transition-colors">Subscribe</button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-offblack/5 gap-8">
        <div className="flex gap-10 text-offblack/40">
          <Instagram size={20} strokeWidth={1} className="hover:text-terracotta cursor-pointer transition-colors" />
          <Facebook size={20} strokeWidth={1} className="hover:text-terracotta cursor-pointer transition-colors" />
          <Twitter size={20} strokeWidth={1} className="hover:text-terracotta cursor-pointer transition-colors" />
        </div>
        <p className="text-[9px] text-offblack/30 uppercase tracking-[0.5em] font-medium">
          © 2026 Yum Goods Studio. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

const StoryModal = ({ 
  story, 
  onClose,
  onNext
}: { 
  story: Story | null; 
  onClose: () => void;
  onNext?: () => void;
}) => (
  <AnimatePresence>
    {story && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-cream overflow-y-auto overflow-x-hidden"
      >
        <div className="sticky top-0 z-50 p-6 flex justify-between items-center bg-cream/80 backdrop-blur-md">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-offblack/40">Editorial Journal</span>
          <button 
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center hover:bg-offblack/5 rounded-full transition-colors"
          >
            <X size={24} strokeWidth={1} />
          </button>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 min-h-[80vh] items-center mt-12">
            <motion.div 
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-[3/4] overflow-hidden"
            >
              <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
            </motion.div>

            <motion.div 
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col justify-center max-w-2xl"
            >
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-terracotta mb-8 block">Story by {story.author}</span>
              <h2 className="text-5xl sm:text-7xl font-serif italic mb-8 leading-tight">{story.title}</h2>
              <p className="text-xl sm:text-2xl font-serif italic text-offblack/60 mb-12 border-l-4 border-terracotta pl-8 py-2">
                {story.subtitle}
              </p>
              
              <div className="space-y-8 text-offblack/80 text-lg leading-relaxed font-light">
                {story.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {onNext && (
                <button 
                  onClick={onNext}
                  className="mt-16 flex items-center gap-6 text-xs uppercase tracking-[0.4em] font-bold border-b-2 border-offblack pb-3 hover:text-terracotta hover:border-terracotta transition-all group w-fit"
                >
                  Next Story <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const SearchOverlay = ({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange
}: {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed inset-0 z-[120] bg-cream p-10 flex flex-col"
      >
        <div className="flex justify-end mb-20">
          <button 
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center hover:bg-offblack/5 rounded-full transition-colors"
          >
            <X size={32} strokeWidth={1} />
          </button>
        </div>
        
        <div className="max-w-4xl mx-auto w-full text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-offblack/30 mb-10 block">Search our collection</span>
          <div className="relative">
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Start typing..."
              className="w-full bg-transparent text-4xl sm:text-6xl font-serif italic text-offblack outline-none border-b-2 border-offblack/10 pb-6 focus:border-terracotta transition-colors placeholder:text-offblack/10"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-0 bottom-8 text-offblack/40 hover:text-offblack"
              >
                Clear
              </button>
            )}
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-10">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-offblack/20">Popular searches:</span>
            <div className="flex gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-offblack/60">
              <button onClick={() => onSearchChange('Ceramics')} className="hover:text-terracotta transition-colors">Ceramics</button>
              <button onClick={() => onSearchChange('Furniture')} className="hover:text-terracotta transition-colors">Furniture</button>
              <button onClick={() => onSearchChange('Oak')} className="hover:text-terracotta transition-colors">Oak</button>
            </div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const CartSidebar = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove,
  onUpdateQuantity 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-offblack/40 backdrop-blur-md z-50"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-cream z-[60] shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.1)] flex flex-col"
          >
            <div className="p-10 flex items-center justify-between border-b border-offblack/5">
              <h2 className="text-2xl font-serif italic">Your Bag ({items.length})</h2>
              <button 
                onClick={onClose} 
                className="w-10 h-10 flex items-center justify-center hover:bg-offblack/5 rounded-full transition-colors"
              >
                <X size={24} strokeWidth={1} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-offblack/30 mb-8 font-bold">Your bag is currently empty.</p>
                  <button 
                    onClick={onClose}
                    className="px-10 py-4 border-2 border-offblack text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-offblack hover:text-white transition-all transform active:scale-95"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.id} 
                    className="flex gap-8 group"
                  >
                    <div className="w-32 aspect-[3/4] bg-stone-50 overflow-hidden border border-offblack/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 flex flex-col py-1">
                      <div className="mb-auto">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-serif italic mb-1">{item.name}</h3>
                          <button 
                            onClick={() => onRemove(item.id)} 
                            className="text-offblack/20 hover:text-terracotta transition-colors p-1"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-offblack/40 font-bold mb-4">{item.category}</p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-offblack/10">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-10 h-10 flex items-center justify-center text-base hover:bg-offblack/5 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-10 text-center text-xs font-bold font-sans">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-10 h-10 flex items-center justify-center text-base hover:bg-offblack/5 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-base font-medium tracking-tight">€{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            
            {items.length > 0 && (
              <div className="p-10 bg-artist-bg border-t border-offblack/5 space-y-8">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-[0.4em]">
                  <span className="text-offblack/50">Subtotal</span>
                  <span className="text-xl font-serif italic text-offblack">€{total}</span>
                </div>
                <button className="w-full py-5 bg-terracotta text-white uppercase text-[10px] tracking-[0.4em] font-bold hover:bg-offblack transition-all duration-500 shadow-2xl flex items-center justify-center gap-3 active:scale-[0.98]">
                  Complete Purchase <ArrowRight size={14} />
                </button>
                <p className="text-[9px] text-center text-offblack/30 uppercase tracking-[0.3em] font-bold">Complimentary Global Shipping Included</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const nextStory = () => {
    if (!selectedStory) return;
    const currentIndex = STORIES.findIndex(s => s.id === selectedStory.id);
    const nextIndex = (currentIndex + 1) % STORIES.length;
    setSelectedStory(STORIES[nextIndex]);
  };

  const filteredProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-cream font-sans selection:bg-terracotta selection:text-white">
      <TopBanner />
      <Header 
        cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)} 
        onCartClick={() => setCartOpen(true)} 
        onStoryClick={() => setSelectedStory(STORIES[0])}
        onSearchClick={() => setSearchOpen(true)}
      />
      
      <main className="flex-1">
        <Hero />
        
        {/* Product Showcase Section */}
        <section id="shop" className="max-w-7xl mx-auto px-6 py-24 sm:py-48">
          <div className="flex flex-col sm:flex-row justify-between items-baseline mb-24 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-terracotta mb-6 block">Current Curations</span>
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif italic tracking-tighter text-offblack">
                {searchQuery ? `Results for "${searchQuery}"` : "The Spring Edit."}
              </h2>
            </motion.div>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-[10px] uppercase tracking-[0.4em] font-bold text-terracotta hover:text-offblack transition-colors"
              >
                Clear Search
              </button>
            )}
            {!searchQuery && (
              <motion.button 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[10px] uppercase tracking-[0.4em] font-bold border-b-2 border-offblack pb-2 hover:text-terracotta hover:border-terracotta transition-all"
              >
                Browse All
              </motion.button>
            )}
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAdd={addToCart} 
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-xl font-serif italic text-offblack/40 mb-4">No objects found matching your search.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-xs uppercase tracking-widest font-bold border-b border-offblack pb-1 hover:text-terracotta transition-colors"
              >
                View all products
              </button>
            </div>
          )}
        </section>

        <ArtistExperience onReadStory={() => setSelectedStory(STORIES[0])} />
        
        <EthicsSection />
      </main>

      <Footer />

      <CartSidebar 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <StoryModal 
        story={selectedStory} 
        onClose={() => setSelectedStory(null)} 
        onNext={nextStory}
      />

      <SearchOverlay 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1A1A1A15;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D48166;
        }
        html {
          scroll-behavior: smooth;
        }
      `}} />
    </div>
  );
}
