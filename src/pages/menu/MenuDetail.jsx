import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, ShoppingCart, Star, Clock, Flame, Leaf, Plus, Minus, Share2, ChefHat } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import useMenuItems from '../../hooks/useMenuItems';
import { VegIcon, StarRating, Badge } from '../../components/ui/index';
import toast from 'react-hot-toast';

export default function MenuDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const { items: MENU_ITEMS = [] } = useMenuItems();
  const item = MENU_ITEMS.find(i => String(i.id) === String(id) || String(i._id) === String(id));
  const related = MENU_ITEMS.filter(i => i.id !== item?.id && String(i.category || '') === String(item?.category || '')).slice(0, 4);

  const safeItem = item || {};
  const itemTags = Array.isArray(safeItem.tags) ? safeItem.tags : [];
  const itemIngredients = Array.isArray(safeItem.ingredients) ? safeItem.ingredients : [];
  const itemAllergens = Array.isArray(safeItem.allergens) ? safeItem.allergens : [];
  const itemName = String(safeItem.name || 'Dish');
  const itemImage = safeItem.image || '';
  const itemCategory = String(safeItem.category || 'Unknown');
  const itemPrice = Number(safeItem.price ?? 0);
  const itemOriginalPrice = Number(safeItem.originalPrice ?? 0);
  const itemDiscount = Number(safeItem.discount ?? 0);
  const itemRating = Number(safeItem.rating ?? 0);
  const itemReviews = Number(safeItem.reviews ?? 0);
  const itemPrepTime = String(safeItem.prepTime || 'N/A');
  const itemIsVeg = Boolean(safeItem.isVeg);
  const itemCalories = Number(safeItem.calories ?? 0);
  const itemProtein = Number(safeItem.protein ?? 0);
  const itemCarbs = Number(safeItem.carbs ?? 0);
  const itemFat = Number(safeItem.fat ?? 0);

  if (!item) return (
    <MainLayout>
      <div className="container-custom py-24 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Item Not Found</h2>
        <Link to="/menu" className="text-orange-500 hover:text-orange-600">← Back to Menu</Link>
      </div>
    </MainLayout>
  );

  return (
    <MainLayout>
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/menu" className="hover:text-orange-500 transition-colors">Menu</Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-200">{itemName}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src={itemImage} alt={itemName} className="w-full h-80 lg:h-[480px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                {safeItem.badge && (
                  <span className={`px-3 py-1.5 rounded-full text-sm font-bold text-white shadow-lg ${
                    safeItem.badge === 'Best Seller' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                    safeItem.badge === "Chef's Special" ? 'bg-gradient-to-r from-purple-500 to-blue-500' :
                    'bg-gradient-to-r from-emerald-500 to-teal-500'
                  }`}>{safeItem.badge}</span>
                )}
                {itemDiscount > 0 && <span className="px-3 py-1.5 rounded-full text-sm font-bold text-white bg-red-500">{itemDiscount}% OFF</span>}
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={() => toggleWishlist(item)} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-lg ${isWishlisted(item.id) ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-400 hover:text-red-500'}`}>
                  <Heart className={`w-5 h-5 ${isWishlisted(item.id) ? 'fill-current' : ''}`} />
                </button>
                <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }} className="w-10 h-10 rounded-xl bg-white/90 flex items-center justify-center text-gray-500 hover:text-gray-700 shadow-lg">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <VegIcon isVeg={item.isVeg} />
                <span className="text-white text-sm font-medium bg-black/40 px-2 py-1 rounded-lg">{item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}</span>
              </div>
            </div>

            {/* Nutrition mini-cards */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              {[['🔥', itemCalories, 'Calories'], ['💪', itemProtein, 'Protein'], ['🍞', itemCarbs, 'Carbs'], ['🥑', itemFat, 'Fat']].map(([icon, val, label]) => (
                <div key={label} className="bg-white dark:bg-gray-900 rounded-2xl p-3 text-center shadow-sm border border-gray-100 dark:border-gray-800">
                  <div className="text-xl mb-1">{icon}</div>
                  <div className="font-bold text-gray-900 dark:text-white text-sm">{val}</div>
                  <div className="text-xs text-gray-400">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-3">
              {itemTags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-xs font-semibold">{tag}</span>
              ))}
            </div>

<h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 leading-tight">{itemName}</h1>

            <div className="flex items-center gap-4 mb-5">
              <StarRating rating={itemRating} reviews={itemReviews} size="lg" />
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                <Clock className="w-4 h-4" /> {itemPrepTime}
              </span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                {itemIsVeg ? <Leaf className="w-4 h-4 text-green-500" /> : <Flame className="w-4 h-4 text-red-500" />}
                {itemCategory}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black text-gray-900 dark:text-white">₹{itemPrice}</span>
              {itemOriginalPrice > itemPrice && (
                <span className="text-xl text-gray-400 line-through">₹{itemOriginalPrice}</span>
              )}
              {itemDiscount > 0 && (
                <span className="text-green-500 font-bold">Save ₹{itemOriginalPrice - itemPrice}!</span>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-4">
              {['description', 'ingredients', 'allergens'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all ${activeTab === tab ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 mb-6 min-h-[100px]">
              {activeTab === 'description' && <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>}
              {activeTab === 'ingredients' && (
                <div className="flex flex-wrap gap-2">
                  {itemIngredients.map(ing => <span key={ing} className="px-3 py-1.5 bg-white dark:bg-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">{ing}</span>)}
                </div>
              )}
              {activeTab === 'allergens' && (
                itemAllergens.length > 0 ? (
                  <div>
                    <p className="text-sm text-red-500 font-medium mb-2">⚠️ Contains allergens:</p>
                    <div className="flex flex-wrap gap-2">
                      {itemAllergens.map(a => <span key={a} className="px-3 py-1.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl text-sm">{a}</span>)}
                    </div>
                  </div>
                ) : <p className="text-green-600 dark:text-green-400">✅ No major allergens detected.</p>
              )}
            </div>

            {/* Add to cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-orange-500 hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-black text-gray-900 dark:text-white text-lg">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 flex items-center justify-center text-orange-500 hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => { for (let i = 0; i < qty; i++) addToCart(item); }}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all shadow-xl hover:shadow-orange-500/30 text-base"
              >
                <ShoppingCart className="w-5 h-5" /> Add {qty} to Cart • ₹{itemPrice * qty}
              </button>
            </div>

            {/* Chef note */}
            {item.isChefSpecial && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl border border-purple-100 dark:border-purple-800">
                <ChefHat className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">Chef Marco Rossi's Pick</p>
                  <p className="text-xs text-purple-600/80 dark:text-purple-400">This dish is personally recommended by our Head Chef and is one of his signature creations.</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Related items */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(r => (
                <Link key={r.id} to={`/menu/${r.id}`} className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-card-hover transition-all">
                  <div className="relative overflow-hidden h-36">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute bottom-2 left-2"><VegIcon isVeg={r.isVeg} /></div>
                  </div>
                  <div className="p-3">
                    <p className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">{r.name}</p>
                    <p className="text-orange-500 font-bold text-sm">₹{r.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
