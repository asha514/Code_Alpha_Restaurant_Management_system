import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

const normalizeItem = (item) => ({ ...item, id: item.id ?? item._id?.toString() });

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('savoria-wishlist') || '[]');
      return Array.isArray(stored) ? stored.map(normalizeItem) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('savoria-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (item) => {
    const normalized = normalizeItem(item);
    setWishlist(prev => {
      const exists = prev.find(i => i.id === normalized.id);
      if (exists) {
        toast('Removed from wishlist', { icon: '💔' });
        return prev.filter(i => i.id !== normalized.id);
      }
      toast.success('Added to wishlist!', { icon: '❤️' });
      return [...prev, normalized];
    });
  };

  const isWishlisted = (id) => {
    const lookupId = typeof id === 'object' ? String(id.id ?? id._id ?? '') : String(id ?? '');
    return wishlist.some(i => i.id === lookupId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
