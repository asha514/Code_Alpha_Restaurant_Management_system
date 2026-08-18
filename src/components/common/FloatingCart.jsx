import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function FloatingCart() {
  const { itemCount, total, setIsCartOpen } = useCart();

  const safeItemCount = itemCount ?? 0;
  const safeTotal = total ?? 0;
  return (
    <AnimatePresence>
      {safeItemCount > 0 && (
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl shadow-xl shadow-orange-500/30 hover:from-orange-600 hover:to-red-600 transition-all lg:hidden"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-orange-600 rounded-full text-xs flex items-center justify-center font-bold">
              {safeItemCount}
            </span>
          </div>
          <span className="font-semibold text-sm">{safeItemCount} item{safeItemCount > 1 ? 's' : ''}</span>
          <span className="text-sm font-bold">₹{(safeTotal).toLocaleString()}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
