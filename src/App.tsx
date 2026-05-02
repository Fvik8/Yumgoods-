import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Базов URL за твоите снимки в GitHub (Raw формат)
const GITHUB_BASE = "https://raw.githubusercontent.com/Fvik8/Yumgoods-/main/Images";

// --- Data ---
const STORIES: Story[] = [
  {
    id: 'weaving',
    title: "The Weaver's Hand",
    subtitle: "A journey through the raw wool of the Pyrenees",
    author: "Elena Moretti",
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=1200",
    content: [
      "In the high valleys of the Pyrenees, the air is thin and the silence is heavy. This is where our Raw Wool Throw begins.",
      "The wool is never bleached, never processed with harsh chemicals. It retains the natural oils.",
      "When you touch a Yum Goods textile, you are touching the legacy of the mountain."
    ]
  }
];

const PRODUCTS: Product[] = [
  { id: 1, name: "Sabi Ceramic Vase", price: 145, image: `${GITHUB_BASE}/Sabi%20Ceramic%20Vase.png`, category: "Ceramics", badge: "Handmade" },
  { id: 2, name: "Oak Lounge Chair", price: 890, image: `${GITHUB_BASE}/Oak%20Lounge%20Chair.png`, category: "Furniture", badge: "Limited Edition" },
  { id: 3, name: "Raw Wool Throw", price: 180, image: `${GITHUB_BASE}/Raw%20Wool%20Throw.png`, category: "Textiles", badge: "Eco-friendly" },
  { id: 4, name: "Hand-carved Bowl", price: 95, image: `${GITHUB_BASE}/Hand-carved%20Bowl.png`, category: "Kitchen", badge: "Handmade" },
  { id: 5, name: "Minimalist Pendant", price: 320, image: `${GITHUB_BASE}/Minimalist%20Pendant.png`, category: "Lighting", badge: "Artist Series" },
  { id: 6, name: "Stone Incense Burner", price: 65, image: `${GITHUB_BASE}/Stone%20Incense%20Burner.png`, category: "Aroma", badge: "Bestseller" }
];

// --- Components ---

const Header = ({ cartCount, onCartClick, onStoryClick, onSearchClick }: any) => (
  <header className="sticky top-0 z-40 bg-[#F9F8F6]/80 backdrop-blur-md border-b border-black/5">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <nav className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold">
        <a href="#shop" className="hover:text-[#D48166] transition-colors">Shop</a>
        <a href="#artists" className="hover:text-[#D48166] transition-colors">Artists</a>
        <button onClick={onStoryClick} className="hover:text-[#D48166] transition-colors uppercase">Story</button>
      </nav>
      <div className="flex-1 md:text-center"><h1 className="text-3xl font-serif italic tracking-tighter">Yum Goods</h1></div>
      <div className="flex items-center gap-6">
        <button onClick={onSearchClick} className="hover:text-[#D48166]"><Search size={18} /></button>
        <button onClick={onCartClick} className="relative flex items-center gap-2">
          <ShoppingCart size={18} />
          {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#D48166] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
          <span className="text-[10px] uppercase font-bold hidden sm:block tracking-widest">Cart</span>
        </button>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative h-[85vh] overflow-hidden flex items-center justify-center bg-[#EBEAE8]">
    <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0">
      <img src={`${GITHUB_BASE}/Minimalist%20interior.png`} className="w-full h-full object-cover" alt="Hero" />
      <div className="absolute inset-0 bg-black/5" />
    </motion.div>
    <div className="relative z-10 text-center px-6">
      <h2 className="text-5xl md:text-8xl mb-8 font-serif italic">Objects with Soul.</h2>
      <button className="px-10 py-4 bg-[#D48166] text-white uppercase text-[10px] tracking-[0.3em] font-bold hover:bg-black transition-all">Explore Collection</button>
    </div>
  </section>
);

const CartSidebar = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }: any) => {
  const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 h-full w-full max-w-md bg-[#F9F8F6] z-[60] p-10 flex flex-col shadow-xl">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-serif italic">Your Bag</h2>
              <button onClick={onClose}><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-6">
              {items.map((item: any) => (
                <div key={item.id} className="flex gap-4 border-b border-black/5 pb-4">
                  <img src={item.image} className="w-20 h-24 object-cover" />
                  <div className="flex-1">
                    <h3 className="font-serif italic">{item.name}</h3>
                    <p className="text-xs text-black/40">€{item.price}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                      <span className="text-xs">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <button onClick={() => onRemove(item.id)}><X size={14} className="text-black/20" /></button>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-black/10 mt-6">
              <div className="flex justify-between font-bold text-sm uppercase tracking-widest mb-6"><span>Total</span><span>€{total}</span></div>
              <button className="w-full py-4 bg-[#D48166] text-white font-bold uppercase text-[10px] tracking-widest">Checkout</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const filteredProducts = PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="bg-[#F9F8F6] text-[#1A1A1A] min-h-screen">
      <Header cartCount={cartItems.length} onCartClick={() => setCartOpen(true)} onSearchClick={() => setSearchOpen(true)} onStoryClick={() => setSelectedStory(STORIES[0])} />
      
      <main>
        <Hero />
        
        <section id="shop" className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-4xl md:text-6xl font-serif italic mb-16">The Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {filteredProducts.map(p => (
              <div key={p.id} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-white mb-6">
                  <img src={p.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <button onClick={() => addToCart(p)} className="absolute inset-x-0 bottom-0 py-4 bg-black text-white text-[9px] uppercase font-bold translate-y-full group-hover:translate-y-0 transition-transform">Add to Cart +</button>
                </div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif italic text-xl">{p.name}</h3>
                  <span className="text-sm">€{p.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Artist Section */}
        <section id="artists" className="bg-[#EBEAE8] py-24 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#D48166] font-bold block mb-6">Craftsmanship</span>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-8">"Every piece holds the breath of its creator."</h2>
            <button onClick={() => setSelectedStory(STORIES[0])} className="text-[10px] uppercase font-bold border-b border-black pb-2">Read Our Story</button>
          </div>
        </section>
      </main>

      <CartSidebar 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        items={cartItems} 
        onRemove={(id: number) => setCartItems(prev => prev.filter(i => i.id !== id))}
        onUpdateQuantity={(id: number, delta: number) => setCartItems(prev => prev.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity + delta)} : i))}
      />

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#F9F8F6] p-10 flex flex-col items-center justify-center">
            <button onClick={() => setSearchOpen(false)} className="absolute top-10 right-10"><X size={32} /></button>
            <input 
              autoFocus
              type="text" 
              placeholder="Search objects..." 
              className="text-4xl md:text-6xl font-serif italic bg-transparent border-b border-black/10 outline-none w-full max-w-4xl text-center pb-6"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Story Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-[#F9F8F6] overflow-y-auto p-10">
            <div className="max-w-4xl mx-auto">
              <button onClick={() => setSelectedStory(null)} className="mb-10"><X size={32} /></button>
              <h2 className="text-5xl font-serif italic mb-6">{selectedStory.title}</h2>
              <p className="text-xl text-black/60 italic mb-10">{selectedStory.subtitle}</p>
              <div className="space-y-6 text-lg leading-relaxed">
                {selectedStory.content.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-20 text-center border-t border-black/5">
        <h1 className="text-2xl font-serif italic mb-4">Yum Goods</h1>
        <p className="text-[9px] uppercase tracking-widest text-black/30">© 2026 Yum Goods Studio</p>
      </footer>
    </div>
  );
}
