import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

const normalizeItem = (item) => ({ ...item, id: item.id ?? item._id?.toString() });
const cloneCartItem = (item) => ({ ...normalizeItem(item), quantity: Number(item.quantity ?? 1) });

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('savoria-cart') || '[]');
      return Array.isArray(stored) ? stored.map(cloneCartItem) : [];
    } catch {
      return [];
    }
  });
  const [coupon, setCoupon] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('savoria-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const normalized = cloneCartItem(item);
    setCart(prev => {
      const existing = prev.find(i => i.id === normalized.id);
      if (existing) {
        toast.success(`${normalized.name} quantity updated!`, { icon: '🛒' });
        return prev.map(i => i.id === normalized.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      toast.success(`${normalized.name} added to cart!`, { icon: '🍽️' });
      return [...prev, { ...normalized, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
    toast.error('Item removed from cart', { icon: '🗑️' });
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const applyCoupon = (code) => {
    const COUPONS = {
      'SAVE20': { discount: 20, type: 'percentage', maxDiscount: 200, minOrder: 500, title: '20% OFF' },
      'FLAT100': { discount: 100, type: 'flat', maxDiscount: 100, minOrder: 800, title: '₹100 OFF' },
      'FREESHIP': { discount: 40, type: 'delivery', maxDiscount: 40, minOrder: 500, title: 'Free Delivery' },
      'WEEKEND30': { discount: 30, type: 'percentage', maxDiscount: 300, minOrder: 600, title: '30% OFF' },
    };
    const found = COUPONS[code.toUpperCase()];
    if (found) {
      if (subtotal < found.minOrder) {
        toast.error(`Minimum order ₹${found.minOrder} required`);
        return false;
      }
      setCoupon({ code: code.toUpperCase(), ...found });
      toast.success(`Coupon "${found.title}" applied!`, { icon: '🎉' });
      return true;
    }
    toast.error('Invalid coupon code');
    return false;
  };

  const removeCoupon = () => { setCoupon(null); toast('Coupon removed'); };

  const subtotal = cart.reduce((s, i) => s + (Number(i.price ?? 0) * Number(i.quantity ?? 0)), 0);
  const deliveryCharge = subtotal > 500 ? 0 : subtotal === 0 ? 0 : 40;
  const gst = Math.round(subtotal * 0.12);
  let couponDiscount = 0;
  if (coupon) {
    if (coupon.type === 'percentage') couponDiscount = Math.min(Math.round(subtotal * coupon.discount / 100), coupon.maxDiscount);
    else if (coupon.type === 'flat') couponDiscount = coupon.discount;
    else if (coupon.type === 'delivery') couponDiscount = deliveryCharge;
  }
  const total = Math.max(0, subtotal + gst + deliveryCharge - couponDiscount);
  const itemCount = cart.reduce((s, i) => s + Number(i.quantity ?? 0), 0);

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      coupon, applyCoupon, removeCoupon,
      subtotal, deliveryCharge, gst, couponDiscount, total, itemCount,
      isCartOpen, setIsCartOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
