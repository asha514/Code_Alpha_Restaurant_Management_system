import { AnimatePresence, motion } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, Tag, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/index';

export default function CartDrawer() {
  const {
    cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart,
    clearCart, coupon, applyCoupon, removeCoupon,
    subtotal, deliveryCharge, gst, couponDiscount, total, itemCount
  } = useCart();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = () => {
    applyCoupon(couponInput);
    setCouponInput('');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Cart</h2>
                {itemCount > 0 && (
                  <span className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button onClick={clearCart} className="text-xs text-red-500 hover:text-red-600 transition-colors px-2 py-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                    Clear all
                  </button>
                )}
                <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="text-7xl mb-4">🛒</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
                  <p className="text-gray-400 mb-6 text-sm">Add some delicious items to get started!</p>
                  <Button onClick={() => setIsCartOpen(false)} size="sm">
                    <Link to="/menu">Browse Menu</Link>
                  </Button>
                </div>
              ) : (
                cart.map(item => {
                  const safeItem = item || {};
                  const itemQty = Number(safeItem.quantity ?? 1);
                  const itemPrice = Number(safeItem.price ?? 0);
                  return (
                    <motion.div
                      key={safeItem.id || `${safeItem.name || 'cart-item'}-${itemQty}`}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-3 bg-gray-50 dark:bg-gray-800 rounded-2xl p-3"
                    >
                      <img
                        src={safeItem.image || ''}
                        alt={safeItem.name || 'Cart item'}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm leading-tight mb-1 line-clamp-1">{safeItem.name || 'Item'}</p>
                        <p className="text-orange-500 font-bold text-sm">₹{itemPrice}</p>
                              {Number(safeItem.originalPrice || 0) > itemPrice && (
                                <p className="text-gray-400 text-xs line-through">₹{(safeItem.originalPrice ?? 0)}</p>
                              )}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                            <button
                              onClick={() => updateQuantity(safeItem.id, itemQty - 1)}
                              className="w-7 h-7 flex items-center justify-center text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold text-gray-900 dark:text-white">{itemQty}</span>
                            <button
                              onClick={() => updateQuantity(safeItem.id, itemQty + 1)}
                              className="w-7 h-7 flex items-center justify-center text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white ml-auto">
                            ₹{(itemPrice * itemQty).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeFromCart(safeItem.id)}
                            className="w-7 h-7 flex items-center justify-center text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
                {(cart || []).length > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-800 px-5 py-4 space-y-4">
                {/* Coupon */}
                {coupon ? (
                  <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-green-600" />
                      <span className="text-green-700 dark:text-green-400 text-sm font-semibold">{coupon.code} applied!</span>
                    </div>
                    <button onClick={removeCoupon} className="text-xs text-red-500 hover:text-red-600">Remove</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()}
                      className="flex-1 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
                    />
                    <button onClick={handleApplyCoupon} className="px-3 py-2 bg-orange-500 text-white text-sm font-medium rounded-xl hover:bg-orange-600 transition-colors">
                      Apply
                    </button>
                  </div>
                )}

                {/* Price breakdown */}
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Subtotal ({(itemCount ?? 0)} items)</span>
                      <span>₹{((subtotal ?? 0)).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>GST (12%)</span>
                      <span>₹{((gst ?? 0)).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Delivery</span>
                      <span className={((deliveryCharge ?? 0) === 0) ? 'text-green-500 font-medium' : ''}>
                        {(deliveryCharge ?? 0) === 0 ? 'FREE' : `₹${deliveryCharge ?? 0}`}
                      </span>
                    </div>
                    {(couponDiscount ?? 0) > 0 && (
                      <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
                        <span>Discount</span>
                        <span>-₹{couponDiscount ?? 0}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-900 dark:text-white font-bold text-base border-t border-gray-100 dark:border-gray-800 pt-2 mt-2">
                      <span>Total</span>
                      <span className="gradient-text">₹{((total ?? 0)).toLocaleString()}</span>
                    </div>
                </div>

                {/* Checkout button */}
                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-orange-500/30"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
