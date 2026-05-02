import { useState } from 'react';
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
  {
    id: 1,
    name: "Sabi Ceramic Vase",
    price: 145,
    image: `${GITHUB_BASE}/Sabi%20Ceramic%20Vase.png`,
    category: "Ceramics",
    badge: "Handmade"
  },
  {
    id: 2,
    name: "Oak Lounge Chair",
    price: 890,
    image: `${GITHUB_BASE}/Oak%20Lounge%20Chair.png`,
    category: "Furniture",
    badge: "Limited Edition"
  },
  {
    id: 3,
    name: "Raw Wool Throw",
    price: 180,
    image: `${GITHUB_BASE}/Raw%20Wool%20Throw.png`,
    category: "Textiles",
    badge: "Eco-friendly"
  },
  {
    id: 4,
    name: "Hand-carved Bowl",
    price: 95,
    image: `${GITHUB_BASE}/Hand-carved%20Bowl.png`,
    category: "Kitchen",
    badge: "Handmade"
  },
  {
    id: 5,
    name: "Minimalist Pendant",
    price: 320,
    image: `${GITHUB_BASE}/Minimalist%20Pendant.png`,
    category: "Lighting",
    badge: "Artist Series"
  },
  {
    id: 6,
    name: "Stone Incense Burner",
    price: 65,
    image: `${GITHUB_BASE}/Stone%20Incense%20Burner.png`,
    category: "Aroma",
    badge: "Bestseller"
  }
];

// --- Components ---

const TopBanner = () => (
  <div className="bg-black text-white py-2 px-4 text-center text-[10px] tracking-widest uppercase font-medium">
    Free Carbon-Neutral Shipping on orders over €100
  </div>
);

const Header = ({ cartCount, onCartClick, onStoryClick, onSearchClick }: any) => (
  <header className="sticky top-0 z-40 bg-[#F9F8F6]/80 backdrop-blur-md border-b border-black/5">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <nav className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold">
        <a href="#shop" className="hover:text-[#D48166] transition-colors">Shop</a>
        <a href="#artists" className="hover:text-[#D48166] transition-colors">Artists</a>
        <button onClick={onStoryClick} className="hover:text-[#D48166] transition-colors">Story</button>
      </nav>
      
      <div className="flex-1 md:text-center">
        <h1 className="text-3xl font-serif italic tracking-tighter">Yum Goods</h1>
      </div>

      <div className="flex items-center gap-6">
        <button onClick={onSearchClick} className="hover:text-[#D48166] transition-colors"><Search size={18} /></button>
        <button onClick={onCartClick} className="relative flex items-center gap-2 hover:text-[#D48166]">
          <ShoppingCart size={18} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#D48166] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
          )}
          <span className="text-[10px] uppercase tracking-widest font-bold hidden sm:block">Cart</span>
        </button>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative h-[85vh] overflow-hidden flex items-center justify-center px-6 bg-[#EBEAE8]">
    <motion.div 
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0"
    >
      <img 
        src={`${GITHUB_BASE}/Minimalist%20interior.png`}
        alt="Hero Interior"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/5" />
    </motion.div>
    
    <div className="relative z-10 text-center">
      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
        <h2 className="text-5xl md:text-8xl mb-8 font-serif italic text-black">Objects with Soul.</h2>
        <button className="px-10 py-4 bg-[#D48166] text-white uppercase text-[10px] tracking-[0.3em] font-bold hover:bg-black transition-all">
          Explore Collection
        </button>
      </motion.div>
    </div>
  </section>
);

const ProductCard = ({ product, onAdd }: { product: Product, onAdd: (p: Product) => void }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
    <div className="relative aspect-[3/4] overflow-hidden bg-white border border-black/5">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
      {product.badge && <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[9px] uppercase tracking-widest font-bold">{product.badge}</span>}
      <button 
        onClick={() => onAdd(product)}
        className="absolute inset-x-0 bottom-0 py-4 bg-black text-white text-[9px] uppercase tracking-widest font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-300"
      >
        Quick Add +
      </button>
    </div>
    <div className="mt-6 flex flex-col gap-1">
      <span className="text-[9px] uppercase tracking-widest text-black/40 font-bold">{product.category}</span>
      <div className="flex justify-between items-baseline">
        <h3 className="text-xl font-serif italic">{product.name}</h3>
        <span className="text-sm">€{product.price}</span>
      </div>
    </div>
  </motion.div>
);

const Footer = () => (
  <footer className="bg-[#F9F8F6] border-t border-black/5 py-20 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div>
        <h1 className="text-2xl font-serif italic mb-6">Yum Goods</h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 leading-loose">Curated objects for slower living.</p>
      </div>
      <div>
        <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6">Social</h4>
        <div className="flex gap-4 text-black/40">
          <Instagram size={18} /><Facebook size={18} /><Twitter size={18} />
        </div>
      </div>
      <div className="md:col-span-2">
        <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6">Newsletter</h4>
        <div className="flex border-b border-black/20 pb-2">
          <input type="text" placeholder="EMAIL ADDRESS" className="bg-transparent flex-1 text-[10px] outline-none" />
          <button className="text-[10px] font-bold uppercase tracking-widest">Join</button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-black/5 flex justify-between text-[9px] uppercase tracking-widest text-black/30">
      <p>© 2026 Yum Goods Studio</p>
      <p>Handcrafted Digital Experience</p>
    </div>
  </footer>
);

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="bg-[#F9F8F6] text-[#1A1A1A] font-sans">
      <TopBanner />
      <Header cartCount={cartItems.length} />
      <main>
        <Hero />
        <section id="shop" className="max-w-7xl mx-auto px-6 py-32">
          <div className="mb-20">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#D48166]">Curated Edit</span>
            <h2 className="text-5xl md:text-7xl font-serif italic mt-4">The Spring Collection.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-24">
            {PRODUCTS.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} />)}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
