import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, SlidersHorizontal, Grid3X3, List, Heart, ShoppingCart,
  Star, Clock, Flame, Leaf, ChefHat, TrendingUp, X, Filter, Plus, Minus
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import useMenuItems from '../../hooks/useMenuItems';
import { Badge, StarRating, VegIcon, SkeletonCard, EmptyState } from '../../components/ui/index';

function QuickViewModal({ item, onClose }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [qty, setQty] = useState(1);
  if (!item) return null;

  const safeItem = item || {};
  const tags = Array.isArray(safeItem.tags) ? safeItem.tags : [];
  const ingredients = Array.isArray(safeItem.ingredients) ? safeItem.ingredients : [];
  const allergens = Array.isArray(safeItem.allergens) ? safeItem.allergens : [];
  const price = Number(safeItem.price ?? 0);
  const originalPrice = Number(safeItem.originalPrice ?? 0);
  const discount = Number(safeItem.discount ?? 0);
  const rating = Number(safeItem.rating ?? 0);
  const reviews = Number(safeItem.reviews ?? 0);
  const prepTime = safeItem.prepTime || 'N/A';
  const name = String(safeItem.name || 'Dish');
  const image = safeItem.image || '';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-black/50 transition-colors">
          <X className="w-5 h-5" />
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="relative h-64 sm:h-auto">
            <img src={item.image || ''} alt={String(item.name || '')} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            {item.badge && (
              <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white ${item.badge === 'Best Seller' ? 'bg-gradient-to-r from-orange-500 to-red-500' : item.badge === "Chef's Special" ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`}>{item.badge}</div>
            )}
          </div>
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <VegIcon isVeg={item.isVeg} />
                  <h2 className="font-black text-xl text-gray-900 dark:text-white leading-tight">{item.name}</h2>
                </div>
                <button onClick={() => toggleWishlist(item)} className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isWishlisted(item.id) ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-red-500'}`}>
                  <Heart className={`w-4 h-4 ${isWishlisted(item.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              <p className="text-gray-400 text-sm mb-3 line-clamp-3">{String(item.description || '')}</p>
              <StarRating rating={Number(item.rating ?? 0)} reviews={Number(item.reviews ?? 0)} size="md" />
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {item.prepTime || 'N/A'}</span>
                <span className="flex items-center gap-1">🔥 {Number(item.calories ?? 0)} cal</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {Array.isArray(item.tags) ? item.tags.map(tag => <span key={tag} className="px-2 py-0.5 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium">{tag}</span>) : null}
              </div>
            </div>
            <div className="mt-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl font-black text-gray-900 dark:text-white">₹{Number(item.price ?? 0) * qty}</span>
                {Number(item.originalPrice ?? 0) > Number(item.price ?? 0) && <span className="text-gray-400 line-through text-sm">₹{Number(item.originalPrice ?? 0)}</span>}
                {Number(item.discount ?? 0) > 0 && <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">{Number(item.discount ?? 0)}% OFF</span>}
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl"><Minus className="w-4 h-4" /></button>
                  <span className="w-8 text-center font-bold text-gray-900 dark:text-white">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="w-9 h-9 flex items-center justify-center text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl"><Plus className="w-4 h-4" /></button>
                </div>
                <button onClick={() => { for(let i=0;i<qty;i++) addToCart(item); onClose(); }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg">
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </button>
              </div>
              <Link to={`/menu/${item.id}`} className="block text-center text-sm text-orange-500 hover:text-orange-600 font-medium" onClick={onClose}>
                View Full Details →
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [view, setView] = useState('grid');
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || 'All',
    vegOnly: false,
    available: false,
    minPrice: 0,
    maxPrice: 1000,
    minRating: 0,
    sort: 'popular',
    badges: [],
  });

  const setFilter = (key, val) => setFilters(f => ({ ...f, [key]: val }));

  const { items: MENU_ITEMS = [], loading } = useMenuItems();

  const filtered = useMemo(() => {
    let items = [...MENU_ITEMS];
    const query = filters.search.toLowerCase();
    if (filters.search) items = items.filter(i => {
      const name = String(i?.name || '');
      const description = String(i?.description || '');
      return name.toLowerCase().includes(query) || description.toLowerCase().includes(query);
    });
    if (filters.category !== 'All') items = items.filter(i => String(i?.category || '') === filters.category);
    if (filters.vegOnly) items = items.filter(i => Boolean(i?.isVeg));
    if (filters.available) items = items.filter(i => Boolean(i?.isAvailable));
    items = items.filter(i => Number(i?.price ?? 0) >= filters.minPrice && Number(i?.price ?? 0) <= filters.maxPrice);
    if (filters.minRating > 0) items = items.filter(i => Number(i?.rating ?? 0) >= filters.minRating);
    if (filters.badges.includes('bestseller')) items = items.filter(i => Boolean(i?.isBestSeller));
    if (filters.badges.includes('new')) items = items.filter(i => Boolean(i?.isNew));
    if (filters.badges.includes('chef')) items = items.filter(i => Boolean(i?.isChefSpecial));

    switch (filters.sort) {
      case 'price-asc': items.sort((a, b) => a.price - b.price); break;
      case 'price-desc': items.sort((a, b) => b.price - a.price); break;
      case 'rating': items.sort((a, b) => b.rating - a.rating); break;
      case 'popular': items.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0)); break;
      default: break;
    }
    return items;
  }, [filters]);

  const CATEGORIES = useMemo(() => {
    const cats = [{ id: 1, name: 'All', icon: '🍽️' }];
    const map = new Map();
    MENU_ITEMS.forEach((i) => {
      const category = String(i?.category || 'Other');
      if (!map.has(category)) {
        map.set(category, { id: 10 + map.size, name: category, icon: '🍽️' });
      }
    });
    return cats.concat(Array.from(map.values()));
  }, [MENU_ITEMS]);

  const activeFilterCount = [
    filters.vegOnly, filters.available, filters.minPrice > 0,
    filters.maxPrice < 1000, filters.minRating > 0, filters.badges.length > 0,
    filters.category !== 'All',
  ].filter(Boolean).length;

  return (
    <MainLayout>
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 pt-8 pb-16">
        <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white mb-8">
            <span className="text-orange-200 text-sm font-medium uppercase tracking-widest">Explore</span>
            <h1 className="text-4xl md:text-5xl font-black mt-2 mb-3">Our Menu</h1>
              <p className="text-orange-100 max-w-lg mx-auto">Discover {MENU_ITEMS.length}+ dishes crafted with passion. Filter, explore, and order your favourites.</p>
          </motion.div>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search dishes, categories..."
              value={filters.search}
              onChange={e => setFilter('search', e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="container-custom -mt-8 pb-16">
        {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setFilter('category', cat.name)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filters.category === cat.name ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-800'}`}>
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white dark:bg-gray-900 rounded-2xl p-3 shadow-card border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <button onClick={() => setFiltersOpen(!filtersOpen)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${filtersOpen ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
              <SlidersHorizontal className="w-4 h-4" /> Filters {activeFilterCount > 0 && <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${filtersOpen ? 'bg-white text-orange-500' : 'bg-orange-500 text-white'}`}>{activeFilterCount}</span>}
            </button>
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <Leaf className="w-3.5 h-3.5 text-green-500" />
                <input type="checkbox" checked={filters.vegOnly} onChange={e => setFilter('vegOnly', e.target.checked)} className="accent-green-500" />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Veg Only</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">{filtered.length} items</span>
            <select value={filters.sort} onChange={e => setFilter('sort', e.target.value)}
              className="text-sm bg-gray-100 dark:bg-gray-800 border-0 rounded-xl px-3 py-2 text-gray-700 dark:text-gray-300 focus:outline-none">
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
            <div className="flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
              <button onClick={() => setView('grid')} className={`p-1.5 rounded-lg transition-all ${view === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm text-orange-500' : 'text-gray-400 hover:text-gray-600'}`}><Grid3X3 className="w-4 h-4" /></button>
              <button onClick={() => setView('list')} className={`p-1.5 rounded-lg transition-all ${view === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm text-orange-500' : 'text-gray-400 hover:text-gray-600'}`}><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Filter panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-card border border-gray-100 dark:border-gray-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Price Range</label>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <input type="number" value={filters.minPrice} onChange={e => setFilter('minPrice', +e.target.value)}
                      className="w-20 px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-orange-400" placeholder="Min" />
                    <span>—</span>
                    <input type="number" value={filters.maxPrice} onChange={e => setFilter('maxPrice', +e.target.value)}
                      className="w-20 px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-orange-400" placeholder="Max" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Min Rating</label>
                  <div className="flex gap-1">
                    {[0, 3, 3.5, 4, 4.5].map(r => (
                      <button key={r} onClick={() => setFilter('minRating', r)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.minRating === r ? 'bg-yellow-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>
                        {r === 0 ? 'All' : `${r}+`}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Badges</label>
                  <div className="flex flex-wrap gap-1.5">
                    {[{ val: 'bestseller', label: '🔥 Best Seller' }, { val: 'new', label: '🆕 New' }, { val: 'chef', label: '👨‍🍳 Chef Special' }].map(b => (
                      <button key={b.val} onClick={() => setFilter('badges', filters.badges.includes(b.val) ? filters.badges.filter(x => x !== b.val) : [...filters.badges, b.val])}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${filters.badges.includes(b.val) ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-end">
                  <button onClick={() => setFilters({ search: '', category: 'All', vegOnly: false, available: false, minPrice: 0, maxPrice: 1000, minRating: 0, sort: 'popular', badges: [] })}
                    className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1">
                    <X className="w-4 h-4" /> Reset all filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Items grid */}
        {filtered.length === 0 ? (
          <EmptyState icon="🍽️" title="No items found" description="Try adjusting your filters or search term." action={<button onClick={() => setFilters(f => ({ ...f, search: '', category: 'All', vegOnly: false }))} className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold">Clear Filters</button>} />
        ) : (
          <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5' : 'space-y-4'}>
            {filtered.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i, 7) * 0.05 }}>
                {view === 'grid' ? (
                  <div className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1">
                    <div className="relative overflow-hidden">
                      <img src={item.image || ''} alt={String(item.name || '')} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      {item.badge && (
                        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold text-white ${item.badge === 'Best Seller' ? 'bg-gradient-to-r from-orange-500 to-red-500' : item.badge === "Chef's Special" ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`}>{item.badge}</div>
                      )}
                      {Number(item.discount ?? 0) > 0 && <div className="absolute top-3 right-10 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{Number(item.discount ?? 0)}%</div>}
                      <button onClick={() => toggleWishlist(item)} className={`absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isWishlisted(item.id) ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-400 hover:text-red-500'}`}>
                        <Heart className={`w-3.5 h-3.5 ${isWishlisted(item.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button onClick={() => setQuickViewItem(item)} className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                        Quick View
                      </button>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1"><VegIcon isVeg={item.isVeg} /></div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1 mb-1">{item.name}</h3>
                      <p className="text-gray-400 text-xs mb-2 line-clamp-2">{String(item.description || '')}</p>
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{Number(item.rating ?? 0)}</span>
                        <span className="text-xs text-gray-400">({Number(item.reviews ?? 0)})</span>
                        <span className="ml-auto flex items-center gap-1 text-xs text-gray-400"><Clock className="w-3 h-3" />{item.prepTime || 'N/A'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-black text-gray-900 dark:text-white">₹{Number(item.price ?? 0)}</span>
                          {Number(item.originalPrice ?? 0) > Number(item.price ?? 0) && <span className="text-xs text-gray-400 line-through ml-1">₹{Number(item.originalPrice ?? 0)}</span>}
                        </div>
                        <button onClick={() => addToCart(item)} className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-xs font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-sm">
                          <Plus className="w-3 h-3" /> Add
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-4 bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-card border border-gray-100 dark:border-gray-800 hover:shadow-card-hover transition-all group">
                    <div className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-1.5 left-1.5"><VegIcon isVeg={item.isVeg} /></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">{item.name}</h3>
                        {item.badge && <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full font-medium flex-shrink-0">{item.badge}</span>}
                      </div>
                      <p className="text-gray-400 text-sm line-clamp-2 mt-1">{item.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-0.5"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {Number(item.rating ?? 0)} ({Number(item.reviews ?? 0)})</span>
                        <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" /> {item.prepTime || 'N/A'}</span>
                        {Number(item.discount ?? 0) > 0 && <span className="text-red-500 font-semibold">{Number(item.discount ?? 0)}% OFF</span>}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-gray-900 dark:text-white text-lg">₹{Number(item.price ?? 0)}</span>
                          {Number(item.originalPrice ?? 0) > Number(item.price ?? 0) && <span className="text-gray-400 line-through text-sm">₹{Number(item.originalPrice ?? 0)}</span>}
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => toggleWishlist(item)} className={`w-9 h-9 rounded-xl flex items-center justify-center ${isWishlisted(item.id) ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-red-500'}`}>
                            <Heart className={`w-4 h-4 ${isWishlisted(item.id) ? 'fill-current' : ''}`} />
                          </button>
                          <button onClick={() => addToCart(item)} className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-sm font-semibold hover:from-orange-600 hover:to-red-600 transition-all">
                            <ShoppingCart className="w-3.5 h-3.5" /> Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>{quickViewItem && <QuickViewModal item={quickViewItem} onClose={() => setQuickViewItem(null)} />}</AnimatePresence>
    </MainLayout>
  );
}
