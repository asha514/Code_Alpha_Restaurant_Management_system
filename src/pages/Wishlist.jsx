import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { VegIcon, StarRating, EmptyState } from '../components/ui/index';

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <MainLayout>
      <div className="container-custom py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500 fill-current" /> My Wishlist
            </h1>
            <p className="text-gray-400 mt-1">{wishlist.length} items saved for later</p>
          </div>
          {wishlist.length > 0 && (
            <Link
              to="/menu"
              className="text-sm font-semibold text-orange-500 hover:text-orange-600 flex items-center gap-1"
            >
              Explore More Dishes <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {wishlist.length === 0 ? (
          <EmptyState
            icon="❤️"
            title="Your Wishlist is Empty"
            description="Explore our delicious menu and save your favorite items here!"
            action={
              <Link
                to="/menu"
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-500/30 transition-all inline-block"
              >
                Browse Menu
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-card border border-gray-100 dark:border-gray-800 hover:shadow-card-hover transition-all"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="w-9 h-9 bg-white/90 dark:bg-gray-800/90 rounded-xl flex items-center justify-center text-red-500 hover:scale-110 transition-all shadow-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <VegIcon isVeg={item.isVeg} />
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base line-clamp-1 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mb-3">{item.description}</p>

                  <StarRating rating={item.rating} reviews={item.reviews} />

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-black text-gray-900 dark:text-white">₹{item.price}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-xs font-bold hover:from-orange-600 hover:to-red-600 transition-all shadow-md"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
