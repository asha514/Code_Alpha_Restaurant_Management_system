import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Menu, X, Sun, Moon, Search, Bell, Heart,
  User, ChevronDown, LogOut, Settings, LayoutDashboard,
  Utensils, MapPin, Phone, Star
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import { useNotifications } from '../../context/NotificationContext';
import { Avatar } from '../ui/index';
import useMenuItems from '../../hooks/useMenuItems';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { itemCount, setIsCartOpen } = useCart();
  const { user, isAdmin, logout } = useUser();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const { items: MENU_ITEMS } = useMenuItems();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const query = searchQuery.toLowerCase();
      const results = (MENU_ITEMS || []).filter(item => {
        const name = String(item?.name || '');
        const category = String(item?.category || '');
        return name.toLowerCase().includes(query) || category.toLowerCase().includes(query);
      }).slice(0, 5);
      setSearchResults(results);
    } else setSearchResults([]);
  }, [searchQuery, MENU_ITEMS]);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchRef.current?.focus(), 100);
      }
      if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery(''); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/reservations', label: 'Reservations' },
    { to: '/offers', label: 'Offers' },
    { to: '/about', label: 'About' },
  ];

  const isActive = (path) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-800/50'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg group-hover:shadow-orange-500/40 transition-shadow">
                <Utensils className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-black gradient-text tracking-tight">Savoria</span>
                <div className="text-xs text-gray-400 dark:text-gray-500 leading-none hidden sm:block">Premium Dining</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(link.to)
                      ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search button */}
              <button
                onClick={() => { setSearchOpen(true); setTimeout(() => searchRef.current?.focus(), 100); }}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors hidden sm:flex items-center gap-2"
                title="Search (Ctrl+K)"
              >
                <Search className="w-5 h-5" />
                <span className="hidden xl:flex items-center gap-1 text-xs text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1">
                  <span>Search</span>
                  <kbd className="font-mono">⌘K</kbd>
                </span>
              </button>

              {/* Theme toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
              >
                <AnimatePresence mode="wait">
                  <motion.div key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {/* Wishlist */}
              <Link to="/wishlist" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors hidden sm:block">
                <Heart className="w-5 h-5" />
              </Link>

              {/* Notifications */}
              <Link to="/notifications" className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors hidden sm:block">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold"
                    >
                      {itemCount > 9 ? '9+' : itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* User Menu */}
              {user ? (
                <div className="relative hidden sm:block">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Avatar name={user.name} size="sm" />
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-premium border border-gray-100 dark:border-gray-800 py-2 z-50"
                      >
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{user.name}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                        <div className="py-1">
                          <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <User className="w-4 h-4" /> My Profile
                          </Link>
                          <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <ShoppingCart className="w-4 h-4" /> My Orders
                          </Link>
                          <Link to="/reservations/my" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <MapPin className="w-4 h-4" /> My Reservations
                          </Link>
                          {isAdmin && (
                            <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                              <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
                            </Link>
                          )}
                          <hr className="my-1 border-gray-100 dark:border-gray-800" />
                          <button
                            onClick={() => { logout(); navigate('/'); }}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full"
                          >
                            <LogOut className="w-4 h-4" /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Sign In
                  </Link>
                  <Link to="/register" className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-orange-500/30">
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              <div className="container-custom py-4 space-y-1">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive(link.to)
                        ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex items-center gap-2 pt-2">
                  <Link to="/notifications" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300">
                    <Bell className="w-4 h-4" /> Notifications {unreadCount > 0 && <span className="bg-red-500 text-white text-xs px-1.5 rounded-full">{unreadCount}</span>}
                  </Link>
                  <Link to="/wishlist" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300">
                    <Heart className="w-4 h-4" /> Wishlist
                  </Link>
                </div>
                {user ? (
                  <div className="pt-2 space-y-1">
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <Avatar name={user.name} size="sm" /> {user.name}
                    </Link>
                    <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-2 px-4 py-2.5 w-full text-left text-sm text-red-600 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 pt-2">
                    <Link to="/login" className="flex-1 text-center py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300">Sign In</Link>
                    <Link to="/register" className="flex-1 text-center py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-sm font-semibold">Get Started</Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Global Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
            onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-premium border border-gray-100 dark:border-gray-800 overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search menu items, categories..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none text-lg"
                />
                <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-500">ESC</kbd>
              </div>
              {searchResults.length > 0 ? (
                <div className="p-2 max-h-96 overflow-y-auto">
                  {searchResults.map(item => (
                    <button
                      key={item.id}
                      onClick={() => { navigate(`/menu/${item.id}`); setSearchOpen(false); setSearchQuery(''); }}
                      className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                    >
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-sm text-gray-400">{item.category || 'Unknown'} • ₹{item.price ?? 0}</p>
                      </div>
                      <div className="ml-auto flex items-center gap-1 text-yellow-400">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs text-gray-500">{item.rating ?? 0}</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : searchQuery.length > 1 ? (
                <div className="p-8 text-center text-gray-400">
                  <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p>No results for "{searchQuery}"</p>
                </div>
              ) : (
                <div className="p-4">
                  <p className="text-xs text-gray-400 font-medium mb-2 px-2">QUICK LINKS</p>
                  {[{ label: 'Browse Menu', to: '/menu' }, { label: 'Book a Table', to: '/reservations/book' }, { label: 'My Orders', to: '/orders' }, { label: 'Offers & Coupons', to: '/offers' }].map(l => (
                    <button key={l.to} onClick={() => { navigate(l.to); setSearchOpen(false); }}
                      className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 transition-colors">
                      → {l.label}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for user menu */}
      {userMenuOpen && <div className="fixed inset-0 z-30" onClick={() => setUserMenuOpen(false)} />}
    </>
  );
}
