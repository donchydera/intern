import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { 
  Search, 
  Menu, 
  X, 
  Home, 
  Users, 
  MapPin, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  ArrowRight,
  Calculator,
  Phone,
  Mail,
  Instagram,
  Twitter,
  Linkedin,
  Facebook
} from 'lucide-react';

// --- Types ---
interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  type: 'House' | 'Apartment' | 'Villa' | 'Land';
  listingType: 'Buy' | 'Rent';
  image: string;
  agent: {
    name: string;
    avatar: string;
  };
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
}

// --- Mock Data ---
const MOCK_PROPERTIES: Property[] = [
  {
    id: 1,
    title: "The Obsidian Villa",
    location: "Ikoyi, Lagos",
    price: "₦850,000,000",
    beds: 5,
    baths: 6,
    sqft: 4500,
    type: 'Villa',
    listingType: 'Buy',
    image: "https://picsum.photos/seed/villa1/800/600",
    agent: { name: "Sarah Alabi", avatar: "https://i.pravatar.cc/150?u=sarah" }
  },
  {
    id: 2,
    title: "Azure Heights Penthouse",
    location: "Victoria Island, Lagos",
    price: "₦450,000,000",
    beds: 3,
    baths: 4,
    sqft: 2800,
    type: 'Apartment',
    listingType: 'Buy',
    image: "https://picsum.photos/seed/apt1/800/600",
    agent: { name: "David Okoro", avatar: "https://i.pravatar.cc/150?u=david" }
  },
  {
    id: 3,
    title: "Maitama Manor",
    location: "Maitama, Abuja",
    price: "₦1,200,000,000",
    beds: 7,
    baths: 8,
    sqft: 7200,
    type: 'House',
    listingType: 'Buy',
    image: "https://picsum.photos/seed/house1/800/600",
    agent: { name: "Amina Yusuf", avatar: "https://i.pravatar.cc/150?u=amina" }
  },
  {
    id: 4,
    title: "The Glass House",
    location: "Lekki Phase 1, Lagos",
    price: "₦350,000,000",
    beds: 4,
    baths: 4,
    sqft: 3200,
    type: 'House',
    listingType: 'Buy',
    image: "https://picsum.photos/seed/house2/800/600",
    agent: { name: "Sarah Alabi", avatar: "https://i.pravatar.cc/150?u=sarah" }
  },
  {
    id: 5,
    title: "Wuse II Executive Suite",
    location: "Wuse II, Abuja",
    price: "₦2,500,000 / yr",
    beds: 2,
    baths: 2,
    sqft: 1400,
    type: 'Apartment',
    listingType: 'Rent',
    image: "https://picsum.photos/seed/apt2/800/600",
    agent: { name: "David Okoro", avatar: "https://i.pravatar.cc/150?u=david" }
  },
  {
    id: 6,
    title: "Eko Atlantic Sanctuary",
    location: "Eko Atlantic, Lagos",
    price: "₦950,000,000",
    beds: 4,
    baths: 5,
    sqft: 3800,
    type: 'Apartment',
    listingType: 'Buy',
    image: "https://picsum.photos/seed/apt3/800/600",
    agent: { name: "Amina Yusuf", avatar: "https://i.pravatar.cc/150?u=amina" }
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Oluwatobiloba Adeyemi",
    role: "Tech Founder",
    quote: "Internox didn't just find me a house; they found me a legacy. Their transparency in the Ikoyi market is unmatched.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=olu"
  },
  {
    id: 2,
    name: "Chioma Nwachukwu",
    role: "Investment Banker",
    quote: "The digital tracking of my property sale in Abuja was seamless. I knew exactly where we were at every stage.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=chioma"
  },
  {
    id: 3,
    name: "Ibrahim Musa",
    role: "Oil & Gas Executive",
    quote: "Sophisticated curation. Every property they showed me in Maitama was a masterpiece. Highly recommended.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=ibrahim"
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className={`text-2xl font-bold tracking-tighter ${isScrolled ? 'text-internox-primary' : 'text-white'}`}>
          INTERNOX
        </div>
        
        {/* Desktop Nav */}
        <div className={`hidden md:flex items-center space-x-8 font-medium text-sm uppercase tracking-widest ${isScrolled ? 'text-internox-primary' : 'text-white'}`}>
          <a href="#" className="hover:text-internox-secondary transition-colors">Buy</a>
          <a href="#" className="hover:text-internox-secondary transition-colors">Sell</a>
          <a href="#" className="hover:text-internox-secondary transition-colors">Rent</a>
          <a href="#" className="hover:text-internox-secondary transition-colors">About</a>
          <a href="#" className="hover:text-internox-secondary transition-colors">Contact</a>
          <button className="btn-primary !py-2 !px-4 text-xs">Book Valuation</button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className={isScrolled ? 'text-internox-primary' : 'text-white'} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-internox-primary z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="text-2xl font-bold text-white tracking-tighter">INTERNOX</div>
              <button onClick={() => setIsMobileMenuOpen(false)}><X className="text-white" /></button>
            </div>
            <div className="flex flex-col space-y-8 text-2xl font-serif text-white">
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Buy</a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Sell</a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Rent</a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>About</a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            </div>
            <div className="mt-auto">
              <button className="w-full btn-secondary !text-white !border-white">Book Valuation</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80" 
          alt="Luxury Home" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Architectural Excellence. <br />
          <span className="text-internox-secondary italic">Absolute Transparency.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl mb-12 text-gray-200 font-light max-w-2xl mx-auto"
        >
          Redefining the Nigerian real estate landscape through curated high-end properties and data-driven market insights.
        </motion.p>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white p-2 shadow-2xl flex flex-col md:flex-row items-stretch md:items-center"
        >
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div className="text-left">
              <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Location</label>
              <input type="text" placeholder="Lagos, Abuja..." className="w-full text-internox-primary focus:outline-none font-medium" />
            </div>
            <div className="text-left border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-4">
              <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Property Type</label>
              <select className="w-full text-internox-primary focus:outline-none font-medium bg-transparent">
                <option>All Types</option>
                <option>Villa</option>
                <option>Apartment</option>
                <option>House</option>
              </select>
            </div>
            <div className="text-left border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-4">
              <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Price Range</label>
              <select className="w-full text-internox-primary focus:outline-none font-medium bg-transparent">
                <option>Any Price</option>
                <option>₦100M - ₦300M</option>
                <option>₦300M - ₦700M</option>
                <option>₦700M+</option>
              </select>
            </div>
          </div>
          <button className="btn-primary flex items-center justify-center space-x-2 md:w-48">
            <Search size={18} />
            <span>Search</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const StatsBar = () => {
  const stats = [
    { label: "Properties Sold", value: 1200, suffix: "+", icon: <Home size={24} /> },
    { label: "Happy Clients", value: 3400, suffix: "+", icon: <Users size={24} /> },
    { label: "Cities Covered", value: 14, suffix: "", icon: <MapPin size={24} /> },
    { label: "Years Experience", value: 12, suffix: "", icon: <Clock size={24} /> }
  ];

  return (
    <section className="bg-internox-primary py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <StatItem key={idx} {...stat} />
        ))}
      </div>
    </section>
  );
};

const StatItem = ({ label, value, suffix, icon }: any) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center text-white">
      <div className="text-internox-secondary mb-4 flex justify-center">{icon}</div>
      <div className="text-4xl font-bold mb-2">{count}{suffix}</div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400">{label}</div>
    </div>
  );
};

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white group cursor-pointer overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-internox-primary text-white text-[10px] uppercase tracking-widest px-3 py-1">
          For {property.listingType === 'Buy' ? 'Sale' : 'Rent'}
        </div>
      </div>
      <div className="p-6">
        <div className="text-2xl font-bold text-internox-primary mb-1">{property.price}</div>
        <h3 className="text-lg font-serif mb-1">{property.title}</h3>
        <div className="flex items-center text-gray-400 text-xs mb-4">
          <MapPin size={12} className="mr-1" />
          {property.location}
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mb-6">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>{property.beds} BD</span>
            <span>{property.baths} BA</span>
            <span>{property.sqft} SQFT</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={property.agent.avatar} alt={property.agent.name} className="w-8 h-8 rounded-full" />
            <span className="text-xs font-medium">{property.agent.name}</span>
          </div>
          <button className="text-internox-secondary text-xs font-bold uppercase tracking-widest flex items-center hover:translate-x-1 transition-transform">
            View Details <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Client Voices</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Real stories from individuals who found their legacy through Internox.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div 
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="flex justify-center space-x-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill={i < TESTIMONIALS[current].rating ? "#C29D59" : "none"} color="#C29D59" />
                ))}
              </div>
              <blockquote className="text-2xl md:text-3xl font-serif italic mb-8 leading-relaxed">
                "{TESTIMONIALS[current].quote}"
              </blockquote>
              <div className="flex flex-col items-center">
                <img src={TESTIMONIALS[current].avatar} alt={TESTIMONIALS[current].name} className="w-16 h-16 rounded-full mb-4" />
                <div className="font-bold text-internox-primary">{TESTIMONIALS[current].name}</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">{TESTIMONIALS[current].role}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center space-x-4 mt-12">
            <button 
              onClick={() => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="p-2 border border-gray-200 hover:border-internox-secondary transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length)}
              className="p-2 border border-gray-200 hover:border-internox-secondary transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const MortgageCalculator = () => {
  const [price, setPrice] = useState(500000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [term, setTerm] = useState(20);
  const [rate, setRate] = useState(15);

  const downPayment = (price * downPaymentPercent) / 100;
  const loanAmount = price - downPayment;
  const monthlyRate = rate / 100 / 12;
  const numberOfPayments = term * 12;
  
  const monthlyPayment = loanAmount > 0 
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    : 0;

  const totalCost = monthlyPayment * numberOfPayments;
  const totalInterest = totalCost - loanAmount;

  return (
    <section className="py-24 bg-internox-bg">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Plan Your Investment</h2>
          <p className="text-gray-500 mb-8 max-w-lg">
            Our intelligent mortgage calculator helps you visualize your financial commitment with real-time Nigerian market rates.
          </p>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-widest">Property Price</label>
                <span className="font-bold">₦{price.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="50000000" max="2000000000" step="10000000" 
                value={price} onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full accent-internox-secondary"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-widest">Down Payment ({downPaymentPercent}%)</label>
                <span className="font-bold">₦{downPayment.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="10" max="80" step="5" 
                value={downPaymentPercent} onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-internox-secondary"
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Loan Term (Years)</label>
                <div className="flex space-x-2">
                  {[10, 15, 20, 30].map(t => (
                    <button 
                      key={t} onClick={() => setTerm(t)}
                      className={`flex-1 py-2 text-xs font-bold border ${term === t ? 'bg-internox-primary text-white border-internox-primary' : 'border-gray-200 text-gray-400'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Interest Rate (%)</label>
                <input 
                  type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full border border-gray-200 p-2 focus:outline-none focus:border-internox-secondary font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-12 shadow-2xl border-t-4 border-internox-secondary">
          <div className="text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">Estimated Monthly Payment</div>
            <div className="text-5xl font-bold text-internox-primary">₦{Math.round(monthlyPayment).toLocaleString()}</div>
          </div>
          
          <div className="space-y-6 mb-12">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Principal Amount</span>
              <span className="font-bold">₦{loanAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Total Interest Paid</span>
              <span className="font-bold">₦{Math.round(totalInterest).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center border-t border-gray-100 pt-6">
              <span className="text-sm text-gray-500">Total Cost of Loan</span>
              <span className="font-bold text-lg">₦{Math.round(totalCost).toLocaleString()}</span>
            </div>
          </div>

          <button className="w-full btn-primary flex items-center justify-center space-x-2">
            <Calculator size={18} />
            <span>Speak to a Mortgage Advisor</span>
          </button>
          <p className="text-[10px] text-gray-400 text-center mt-4 italic">
            *Calculations are estimates. Actual rates may vary based on bank policies.
          </p>
        </div>
      </div>
    </section>
  );
};

const LeadModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative bg-white w-full max-w-xl overflow-hidden shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-internox-primary">
          <X size={24} />
        </button>

        {step === 1 ? (
          <div className="p-12">
            <div className="text-internox-secondary mb-4 uppercase tracking-[0.3em] text-xs font-bold">Exclusive Offer</div>
            <h2 className="text-3xl font-bold mb-4">Free Property Valuation</h2>
            <p className="text-gray-500 mb-8">Get a data-backed valuation of your property in Lagos or Abuja within 24 hours.</p>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" required className="w-full border border-gray-200 p-3 focus:outline-none focus:border-internox-secondary" />
                <input type="email" placeholder="Email Address" required className="w-full border border-gray-200 p-3 focus:outline-none focus:border-internox-secondary" />
              </div>
              <input type="tel" placeholder="Phone Number" required className="w-full border border-gray-200 p-3 focus:outline-none focus:border-internox-secondary" />
              <input type="text" placeholder="Property Address" required className="w-full border border-gray-200 p-3 focus:outline-none focus:border-internox-secondary" />
              
              <div className="flex space-x-4 py-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="intent" className="accent-internox-secondary" />
                  <span className="text-sm">Selling</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="intent" className="accent-internox-secondary" />
                  <span className="text-sm">Buying</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="intent" className="accent-internox-secondary" />
                  <span className="text-sm">Investing</span>
                </label>
              </div>

              <button type="submit" className="w-full btn-primary mt-4">Request Valuation</button>
            </form>
          </div>
        ) : (
          <div className="p-12 text-center py-20">
            <div className="w-20 h-20 bg-internox-accent/10 text-internox-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Star size={40} />
            </div>
            <h2 className="text-3xl font-bold mb-4">Thank You</h2>
            <p className="text-gray-500 mb-8">Your request has been received. A senior strategist will contact you shortly.</p>
            <button className="btn-primary w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#128C7E]">
              <Phone size={18} />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-internox-primary text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="text-2xl font-bold tracking-tighter mb-6">INTERNOX</div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Redefining the standard of luxury real estate in Nigeria through architectural curation and absolute transparency.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Featured Listings</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sell Your Property</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Market Insights</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center space-x-3">
                <MapPin size={16} className="text-internox-secondary" />
                <span>12B Alexander Rd, Ikoyi, Lagos</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-internox-secondary" />
                <span>+234 800 INTERNOX</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-internox-secondary" />
                <span>concierge@internox.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-6">Receive exclusive off-market opportunities directly in your inbox.</p>
            <form className="flex">
              <input 
                type="email" placeholder="Email Address" 
                className="flex-1 bg-white/5 border border-white/10 p-3 text-sm focus:outline-none focus:border-internox-secondary" 
              />
              <button className="bg-internox-secondary text-white px-4 hover:bg-opacity-90 transition-all">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-gray-500">
          <div>© 2026 Internox Real Estate. All rights reserved.</div>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Exit intent trigger
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem('modalDismissed')) {
        setIsModalOpen(true);
      }
    };

    // 30s timer trigger
    const timer = setTimeout(() => {
      if (!localStorage.getItem('modalDismissed')) {
        setIsModalOpen(true);
      }
    }, 30000);

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    localStorage.setItem('modalDismissed', 'true');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <Hero />
      
      <StatsBar />

      {/* Featured Listings */}
      <section className="py-24 bg-internox-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-xl">
              <div className="text-internox-secondary mb-4 uppercase tracking-[0.3em] text-xs font-bold">Curated Inventory</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Masterpieces</h2>
              <p className="text-gray-500">Explore our hand-picked selection of the most prestigious properties currently available in Lagos and Abuja.</p>
            </div>
            <button className="btn-secondary mt-8 md:mt-0">View All Properties</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_PROPERTIES.map(prop => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Internox */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" 
                alt="Modern Architecture" 
                className="w-full h-[600px] object-cover shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-12 -right-12 bg-internox-secondary p-12 hidden md:block">
                <div className="text-white text-5xl font-bold mb-2">12+</div>
                <div className="text-white/80 text-[10px] uppercase tracking-widest">Years of Excellence</div>
              </div>
            </div>
            <div>
              <div className="text-internox-secondary mb-4 uppercase tracking-[0.3em] text-xs font-bold">The Internox Edge</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Why Discerning Clients Choose Us</h2>
              
              <div className="space-y-12">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-internox-primary text-white flex items-center justify-center shrink-0">01</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Data-Driven Transparency</h4>
                    <p className="text-gray-500 text-sm">Our proprietary valuation algorithms ensure you never overpay or undersell. Real-time market data at your fingertips.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-internox-primary text-white flex items-center justify-center shrink-0">02</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Architectural Curation</h4>
                    <p className="text-gray-500 text-sm">We don't list every property. We only represent homes that meet our rigorous standards for design and structural integrity.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-internox-primary text-white flex items-center justify-center shrink-0">03</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Digital Transaction Tracking</h4>
                    <p className="text-gray-500 text-sm">Follow your property's journey from listing to closing through our secure client portal. Absolute visibility at every step.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-internox-primary text-white flex items-center justify-center shrink-0">04</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Exclusive Off-Market Access</h4>
                    <p className="text-gray-500 text-sm">Gain access to Nigeria's most prestigious properties before they ever hit the public market.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <MortgageCalculator />

      {/* CTA Section */}
      <section className="py-24 bg-internox-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1600607687940-47a04b697a33?auto=format&fit=crop&w=1920&q=80" alt="Pattern" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Secure Your Legacy?</h2>
          <p className="text-xl text-gray-300 mb-12 font-light">
            Whether you are acquiring a masterpiece or liquidating a portfolio, our strategists are ready to guide you.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <button onClick={() => setIsModalOpen(true)} className="btn-secondary !text-white !border-white w-full md:w-auto">Book a Free Valuation</button>
            <button className="btn-primary !bg-white !text-internox-primary w-full md:w-auto">Contact an Agent</button>
          </div>
        </div>
      </section>

      <Footer />

      <LeadModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
