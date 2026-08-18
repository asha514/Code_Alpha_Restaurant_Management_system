import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Clock, Users, ChefHat, Award, Play, ChevronLeft, ChevronRight, Flame, Leaf, TrendingUp, Heart, ShoppingCart, MapPin, Phone, Check } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import useMenuItems from '../hooks/useMenuItems';
import useSiteMeta from '../hooks/useSiteMeta';
import useOffers from '../hooks/useOffers';
import useChefSpecials from '../hooks/useChefSpecials';
import { Badge, StarRating, VegIcon } from '../components/ui/index';
import foodPlaceholder from '../assets/foods/food-placeholder.svg';

function FoodImage({ src, alt, className = '', imageClassName = '' }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [resolvedSrc, setResolvedSrc] = useState(() => {
    if (!src) return foodPlaceholder;
    if (typeof src !== 'string') return foodPlaceholder;
    const trimmed = src.trim();
    if (!trimmed) return foodPlaceholder;
    if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith('data:')) return trimmed;
    if (trimmed.startsWith('/')) return trimmed;
    return trimmed;
  });

  useEffect(() => {
    if (!src) {
      setResolvedSrc(foodPlaceholder);
      setHasError(true);
      return;
    }
    const trimmed = String(src).trim();
    if (!trimmed) {
      setResolvedSrc(foodPlaceholder);
      setHasError(true);
      return;
    }
    if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith('data:')) {
      setResolvedSrc(trimmed);
      return;
    }
    if (trimmed.startsWith('/')) {
      setResolvedSrc(trimmed);
      return;
    }
    setResolvedSrc(trimmed);
  }, [src]);

  const handleError = () => {
    if (resolvedSrc !== foodPlaceholder) {
      setResolvedSrc(foodPlaceholder);
    }
    setHasError(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-gray-800 dark:to-gray-700 animate-pulse z-10" />
      )}
      <img
        src={resolvedSrc}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover transition-all duration-500 ${isLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'} ${imageClassName}`}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
      />
      {hasError && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-100 to-amber-100 dark:from-gray-800 dark:to-gray-700 text-center px-4">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Image unavailable</span>
        </div>
      )}
    </div>
  );
}

function AnimatedCounter({ end, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const target = Number(end) || 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [inView, end]);
  return <span ref={ref}>{(count ?? 0).toLocaleString()}{suffix}</span>;
}

function MenuCard({ item }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover border border-gray-100 dark:border-gray-800 transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <div className="w-full h-52 overflow-hidden">
          <FoodImage src={item.image} alt={item.name} className="w-full h-full" imageClassName="group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {item.badge && (
          <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white ${item.badge === 'Best Seller' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
              item.badge === "Chef's Special" ? 'bg-gradient-to-r from-purple-500 to-blue-500' :
                item.badge === 'New' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                  'bg-gradient-to-r from-yellow-500 to-orange-500'
            }`}>{item.badge}</div>
        )}
        {item.discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{item.discount}% OFF</div>
        )}
        <button
          onClick={() => toggleWishlist(item)}
          className={`absolute bottom-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${isWishlisted(item.id) ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-400 hover:text-red-500'}`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted(item.id) ? 'fill-current' : ''}`} />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 rounded-full px-2 py-1">
          <VegIcon isVeg={item.isVeg} />
          <Clock className="w-3 h-3 text-white" />
          <span className="text-white text-xs">{item.prepTime}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight line-clamp-1">{item.name}</h3>
        </div>
        <p className="text-gray-400 text-xs mb-2 line-clamp-2">{item.description}</p>
        <StarRating rating={item.rating} reviews={item.reviews} />
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-black text-gray-900 dark:text-white">₹{item.price}</span>
            {item.originalPrice > item.price && (
              <span className="text-xs text-gray-400 line-through ml-1">₹{item.originalPrice}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(item)}
            className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-xs font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-orange-500/30"
          >
            <ShoppingCart className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function Landing() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const heroImages = [
    { img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&auto=format&fit=crop', tag: 'Fine Dining Experience', title: 'Where Every Meal Becomes a Memory' },
    { img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop', tag: "Chef's Special Today", title: 'Crafted With Passion & Perfection' },
    { img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop', tag: 'Ambiance & Comfort', title: 'Dine in Style, Stay in Love' },
  ];

  useEffect(() => {
    const timer = setInterval(() => setHeroSlide(s => (s + 1) % heroImages.length), 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTestimonialIdx(i => (i + 1) % (TESTIMONIALS.length || 1)), 4000);
    return () => clearInterval(timer);
  }, []);

  const { items: MENU_ITEMS = [] } = useMenuItems();
  const { meta = {} } = useSiteMeta();
  const {
  offers: OFFERS = [],
  loading,
  error
} = useOffers();
  const { specials: chefSpecials = [], loading: specialLoading, error: specialError } = useChefSpecials(true);

  const CATEGORIES = Array.isArray(meta.CATEGORIES) && meta.CATEGORIES.length > 0
    ? meta.CATEGORIES
    : [{ id: 1, name: 'All', icon: '🍽️', color: 'from-orange-400 to-red-500' }];
  const TESTIMONIALS = Array.isArray(meta.TESTIMONIALS) && meta.TESTIMONIALS.length > 0
    ? meta.TESTIMONIALS
    : [{ id: 'default', avatar: '👤', review: 'Welcome to Savoria. Experience the taste of perfection.', name: 'Guest', role: 'Food Lover', date: 'Today' }];
  const RESTAURANT_INFO = meta.RESTAURANT_INFO || {};

  // Unified customers count used across hero and stats.
  // Prefer totalOrders, then totalReviews, then fallback to a sensible default so UI never shows 0.
  const CUSTOMERS = Number(RESTAURANT_INFO.totalOrders ?? RESTAURANT_INFO.totalReviews ?? 45230);
  const popularItems = MENU_ITEMS.filter(i => i.isPopular).slice(0, 8);

  // Fallback featured dish when no chef special is available.
  const FALLBACK_SPECIAL = {
    id: 'fallback-thokku-biryani',
    name: 'Thokku Biryani',
    description: 'Traditional spicy Thokku Biryani made with aromatic rice and signature masala.',
    // Photographic fallback (high-quality Unsplash JPG)
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    price: 299,
    category: "Chef's Special",
    isAvailable: true,
  };

  // Prefer today's real chef special when present; otherwise use the fallback featured dish.
  const heroSpecial = (Array.isArray(chefSpecials) && chefSpecials.length > 0 && chefSpecials[0])
    ? chefSpecials[0]
    : FALLBACK_SPECIAL;

  // Choose a fallback hero image when chef special image is missing.
  const chefImage = (heroSpecial && heroSpecial.image && String(heroSpecial.image).trim())
    ? String(heroSpecial.image).trim()
    : (heroImages[1] && heroImages[1].img) || '';
  const filteredMenu = activeCategory === 'All'
    ? MENU_ITEMS.slice(0, 8)
    : MENU_ITEMS.filter(i => i.category === activeCategory).slice(0, 8);

  const instagramPics = MENU_ITEMS.slice(0, 6).map(i => i.image || '');

  const stats = [
    { value: CUSTOMERS, suffix: '+', label: 'Happy Orders', icon: '🍽️', color: 'from-orange-400 to-red-500' },
    { value: RESTAURANT_INFO.rating || 4, suffix: '.8★', label: 'Average Rating', icon: '⭐', color: 'from-yellow-400 to-orange-500' },
    { value: RESTAURANT_INFO.tables || 30, suffix: '+', label: 'Premium Tables', icon: '🪑', color: 'from-purple-400 to-blue-500' },
    { value: RESTAURANT_INFO.chefs || 12, suffix: '+', label: 'Master Chefs', icon: '👨‍🍳', color: 'from-emerald-400 to-teal-500' },
  ];

  const features = [
    { icon: '🌿', title: 'Farm Fresh Ingredients', desc: 'Sourced daily from local farms for maximum freshness and flavor.' },
    { icon: '👨‍🍳', title: 'World-Class Chefs', desc: 'Our culinary team brings 50+ years of combined expertise.' },
    { icon: '⚡', title: 'Fast & Reliable', desc: '30-minute delivery guarantee with real-time tracking.' },
    { icon: '🛡️', title: 'Hygiene First', desc: 'Five-star hygiene standards and regular quality audits.' },
    { icon: '💎', title: 'Premium Quality', desc: 'Only the finest ingredients make it to your plate.' },
    { icon: '🎁', title: 'Loyalty Rewards', desc: 'Earn points on every order and redeem for free meals.' },
  ];

  return (
    <MainLayout>
      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        {/* Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={heroSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img src={heroImages[heroSlide].img} alt="Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Floating shapes */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-20 right-40 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-float-slow pointer-events-none" />

        <div className="relative container-custom">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroSlide}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-orange-200 text-sm font-medium mb-6">
                <Flame className="w-4 h-4" /> {heroImages[heroSlide].tag}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
                {heroImages[heroSlide].title.split(' ').map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="inline-block mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-xl leading-relaxed">
                {RESTAURANT_INFO.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/menu" className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all shadow-xl hover:shadow-orange-500/40 hover:scale-[1.02]">
                  Order Now <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/reservations/book" className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all hover:scale-[1.02]">
                  Book a Table <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Rating badge */}
              <div className="flex items-center gap-4 mt-8">
                <div className="flex -space-x-2">
                  {['👩', '👨', '👩', '👨'].map((e, i) => (
                    <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-red-500 border-2 border-white flex items-center justify-center text-lg">{e}</div>
                  ))}
                </div>
                <div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <span className="text-gray-300 text-sm">{CUSTOMERS.toLocaleString()}+ happy customers</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((slide, i) => (
            <button
              key={slide.title}
              onClick={() => setHeroSlide(i)}
              className={`transition-all duration-300 rounded-full ${i === heroSlide ? 'w-8 h-2 bg-orange-500' : 'w-2 h-2 bg-white/40'}`}
            />
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-12 bg-gray-950 dark:bg-gray-950">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} items-center justify-center text-2xl mb-3 shadow-lg`}>
                  {s.icon}
                </div>
                <div className="text-3xl font-black text-white mb-1">
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="section bg-white dark:bg-gray-950">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Explore</span>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mt-2">Browse by Category</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-lg mx-auto">From sizzling starters to decadent desserts — find exactly what you're craving.</p>
          </motion.div>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.id ?? cat.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.08, y: -4 }}
                onClick={() => navigate(`/menu?category=${cat.name}`)}
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-3xl shadow-lg hover:shadow-xl transition-shadow`}>
                  {cat.icon}
                </div>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center">{cat.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR FOODS ── */}
      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Most Loved</span>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mt-1">Popular Right Now</h2>
            </motion.div>
            <Link to="/menu" className="hidden sm:flex items-center gap-1 text-orange-500 font-semibold hover:gap-2 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <MenuCard item={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TODAY'S SPECIAL banner ── */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-r from-gray-950 via-purple-950 to-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.15)_0%,_transparent_70%)]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="container-custom relative">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1">
              <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">Limited Time</span>
              <h2 className="text-4xl lg:text-6xl font-black text-white mt-2 mb-4">
                Today's<br />
                <span className="gradient-text">Chef Special</span>
              </h2>
              <p className="text-gray-300 mb-6 max-w-md">Our head chef Marco Rossi presents an exclusive signature dish crafted with seasonal ingredients. Available only today!</p>
              <div className="flex flex-wrap gap-3 mb-6">
                {['Fresh Ingredients', 'Limited Portions', 'Chef Recommended'].map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-white text-sm">
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> {tag}
                  </span>
                ))}
              </div>
              <Link to="/menu" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-orange-500/40">
                Order Special <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="w-72 h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-orange-500/30 shadow-2xl shadow-orange-500/20">
                  <FoodImage src={chefImage} alt={heroSpecial?.name || 'Chef special'} className="w-full h-full" imageClassName="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-2xl shadow-lg font-bold">
                  Chef's Pick ⭐
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-3 rounded-2xl shadow-lg">
                  {specialLoading ? (
                    <div className="text-sm text-gray-500">Loading special...</div>
                  ) : specialError ? (
                    <div className="text-sm text-red-500">{specialError}</div>
                  ) : (
                    <>
                      <div className="text-xs text-gray-400">Today only</div>
                      <div className="font-black text-orange-500 text-lg">₹{heroSpecial.price}</div>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MENU BROWSING ── */}
      <section className="section bg-white dark:bg-gray-950">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Our Menu</span>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mt-2">Explore Our Cuisine</h2>
          </motion.div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-8 justify-center flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat.name
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMenu.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <MenuCard item={item} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/menu" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-orange-500 text-orange-500 font-bold rounded-2xl hover:bg-orange-500 hover:text-white transition-all">
              View Full Menu <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Why Savoria</span>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mt-2">The Savoria Difference</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-lg mx-auto">We don't just serve food. We craft experiences that linger long after the last bite.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-card hover:shadow-card-hover border border-gray-100 dark:border-gray-700 transition-all"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFERS ── */}
      <section className="section bg-white dark:bg-gray-950">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Deals</span>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mt-1">Exclusive Offers</h2>
            </motion.div>
            <Link to="/offers" className="hidden sm:flex items-center gap-1 text-orange-500 font-semibold hover:gap-2 transition-all">
              All Offers <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {loading ? (
              [...Array(4)].map((_, index) => (
                <div key={index} className="rounded-3xl p-6 bg-gray-100/90 dark:bg-gray-900/70 animate-pulse h-56" />
              ))
            ) : error ? (
              <div className="col-span-full rounded-3xl p-8 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 text-center">
                <p className="font-semibold">Unable to load offers.</p>
                <p>{error}</p>
              </div>
            ) : OFFERS.length === 0 ? (
              <div className="col-span-full rounded-3xl p-8 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 text-center">
                <p className="font-semibold">No offers available right now.</p>
                <p>Stay tuned for new deals from the kitchen.</p>
              </div>
            ) : (
              OFFERS.map((offer, i) => (
                <motion.div
                  key={offer.id ?? offer.code ?? i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className={`bg-gradient-to-br ${offer.gradient} p-5 rounded-2xl text-white shadow-lg cursor-pointer`}
                >
                  <div className="text-4xl mb-3">{offer.icon}</div>
                  <h3 className="font-bold text-lg mb-1">{offer.title}</h3>
                  <p className="text-white/80 text-sm mb-3">{offer.description}</p>
                  <div className="bg-white/20 rounded-xl px-3 py-1.5 text-sm font-mono font-bold inline-block">{offer.code}</div>
                  <p className="text-white/60 text-xs mt-2">Valid till {offer.validUntil ? new Date(offer.validUntil).toLocaleDateString() : 'N/A'}</p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Reviews</span>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mt-2">What Our Guests Say</h2>
          </motion.div>
          <div className="relative max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl text-center border border-gray-100 dark:border-gray-700"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {TESTIMONIALS[testimonialIdx].avatar}
                </div>
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 italic">"{TESTIMONIALS[testimonialIdx].review}"</p>
                <p className="font-bold text-gray-900 dark:text-white">{TESTIMONIALS[testimonialIdx].name}</p>
                <p className="text-gray-400 text-sm">{TESTIMONIALS[testimonialIdx].role} • {TESTIMONIALS[testimonialIdx].date}</p>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center gap-2 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button key={TESTIMONIALS[i]?.id ?? i} onClick={() => setTestimonialIdx(i)} className={`transition-all rounded-full ${i === testimonialIdx ? 'w-6 h-2 bg-orange-500' : 'w-2 h-2 bg-gray-300 dark:bg-gray-700'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM GALLERY ── */}
      <section className="section bg-white dark:bg-gray-950">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Gallery</span>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mt-2">@savoria on Instagram</h2>
          </motion.div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {instagramPics.map((src, i) => (
              <motion.div
                key={src || i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="aspect-square rounded-2xl overflow-hidden group cursor-pointer relative"
              >
                <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/60 to-pink-500/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white fill-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APP DOWNLOAD ── */}
      <section className="section bg-gradient-to-r from-gray-950 via-orange-950/20 to-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_rgba(249,115,22,0.1)_0%,_transparent_60%)]" />
        <div className="container-custom relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-lg">
              <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">Mobile App</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white mt-2 mb-4">
                Order Smarter with<br />
                <span className="gradient-text">Savoria App</span>
              </h2>
              <p className="text-gray-300 mb-8">Get exclusive app-only deals, track orders in real time, and reorder your favorites in one tap.</p>
              <div className="flex gap-4">
                {[{ name: 'App Store', sub: 'Download on the', emoji: '🍎' }, { name: 'Google Play', sub: 'Get it on', emoji: '🤖' }].map(s => (
                  <button key={s.name} className="flex items-center gap-3 px-5 py-3.5 bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 transition-colors">
                    <span className="text-3xl">{s.emoji}</span>
                    <div className="text-left">
                      <div className="text-white/60 text-xs">{s.sub}</div>
                      <div className="text-white font-bold">{s.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-6">
              {[1, 2].map(n => (
                <motion.div
                  key={n}
                  animate={{ y: n === 1 ? [0, -15, 0] : [0, 15, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: n * 0.5 }}
                  className="w-32 h-56 sm:w-40 sm:h-72 bg-gray-800 rounded-3xl border border-gray-700 overflow-hidden shadow-2xl"
                >
                  <img
                    src={MENU_ITEMS[n * 3]?.image}
                    alt="App screenshot"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.1)_0%,_transparent_70%)]" />
        <div className="container-custom relative text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-4xl font-black text-white mb-3">Stay in the Loop!</h2>
            <p className="text-orange-100 mb-8 max-w-lg mx-auto">Subscribe for exclusive deals, new menu launches, and chef's secret recipes.</p>
            
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
