import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, UtensilsCrossed, ShoppingBag, Table2, Package,
  Users, UserCheck, BarChart3, FileText, Settings, Tag, ChefHat, ChevronLeft,
  ChevronRight, Bell, LogOut, Menu, X, Utensils, Sun, Moon, Clock
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { Avatar } from '../ui/index';

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, color: 'text-orange-500', exact: true },
  { label: 'Manage Menu', to: '/admin/menu', icon: UtensilsCrossed, color: 'text-emerald-500' },
  { label: 'Orders', to: '/admin/orders', icon: ShoppingBag, color: 'text-blue-500' },
  { label: 'Tables', to: '/admin/tables', icon: Table2, color: 'text-purple-500' },
  { label: 'Reservations', to: '/admin/reservations', icon: Bell, color: 'text-pink-500' },
  { label: 'Inventory', to: '/admin/inventory', icon: Package, color: 'text-yellow-500' },
  { label: 'Customers', to: '/admin/customers', icon: Users, color: 'text-cyan-500' },
  { label: 'Employees', to: '/admin/employees', icon: UserCheck, color: 'text-indigo-500' },
  { label: 'Offers', to: '/admin/offers', icon: Tag, color: 'text-pink-500' },
  { label: 'Chef Specials', to: '/admin/chef-specials', icon: ChefHat, color: 'text-purple-500' },
  { label: 'Analytics', to: '/admin/analytics', icon: BarChart3, color: 'text-red-500' },
  { label: 'Reports', to: '/admin/reports', icon: FileText, color: 'text-teal-500' },
  { label: 'Settings', to: '/admin/settings', icon: Settings, color: 'text-gray-500' },
];

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-400">
      <Clock className="w-3.5 h-3.5" />
      <span>{time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
    </div>
  );
}

export default function AdminLayout({ children }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (item) => item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);

  const SidebarContent = ({ mobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-gray-800 ${collapsed && !mobile ? 'justify-center px-2' : ''}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0 shadow-lg">
          <Utensils className="w-5 h-5 text-white" />
        </div>
        {(!collapsed || mobile) && (
          <div>
            <span className="text-white font-black text-lg">Savoria</span>
            <div className="text-xs text-gray-500">Admin Panel</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto no-scrollbar">
        {navItems.map(item => {
          const active = isActive(item);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                active
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              } ${collapsed && !mobile ? 'justify-center px-2' : ''}`}
              title={collapsed && !mobile ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : item.color}`} />
              {(!collapsed || mobile) && <span>{item.label}</span>}
              {active && (!collapsed || mobile) && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={`border-t border-gray-800 p-3 space-y-2 ${collapsed && !mobile ? 'flex flex-col items-center' : ''}`}>
        <LiveClock />
        {user && (!collapsed || mobile) && (
          <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-800">
            <Avatar name={user.name} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">{user.name}</p>
              <p className="text-gray-500 text-xs truncate">{user.email}</p>
            </div>
          </div>
        )}
        <div className={`flex gap-1 ${collapsed && !mobile ? 'flex-col' : ''}`}>
          <button onClick={toggleTheme} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white text-xs transition-colors">
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {(!collapsed || mobile) && (theme === 'dark' ? 'Light' : 'Dark')}
          </button>
          <button onClick={() => { logout(); navigate('/'); }} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl hover:bg-red-900/30 text-gray-400 hover:text-red-400 text-xs transition-colors">
            <LogOut className="w-4 h-4" />
            {(!collapsed || mobile) && 'Logout'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden lg:flex flex-col bg-gray-950 border-r border-gray-800 relative flex-shrink-0"
      >
        <SidebarContent />
        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3.5 top-20 w-7 h-7 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors z-10"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: 'spring', damping: 30 }} className="fixed left-0 top-0 h-full w-64 bg-gray-950 border-r border-gray-800 z-50 lg:hidden">
              <SidebarContent mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-gray-950 border-b border-gray-800 flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-gray-800 text-gray-400">
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/" className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700 rounded-xl transition-colors">
              ← View Site
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <LiveClock />
            <button onClick={toggleTheme} className="p-2 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            {user && <Avatar name={user.name} size="sm" className="cursor-pointer" />}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-950 p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
