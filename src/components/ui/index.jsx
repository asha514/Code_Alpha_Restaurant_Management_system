import { motion } from 'framer-motion';
import { clsx } from 'clsx';

// Ripple Button Component
export function Button({
  children, variant = 'primary', size = 'md', className = '',
  loading = false, icon, fullWidth = false, ...props
}) {
  const base = 'relative overflow-hidden inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-95 select-none disabled:opacity-60 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-orange-500/30 hover:shadow-xl',
    secondary: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 shadow-sm hover:shadow-md',
    outline: 'border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white',
    ghost: 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
    danger: 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 shadow-lg hover:shadow-red-500/30',
    purple: 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-purple-500/30 hover:shadow-xl',
    emerald: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-emerald-500/30 hover:shadow-xl',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20',
  };

  const sizes = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: props.disabled ? 1 : 1.02 }}
      whileTap={{ scale: props.disabled ? 1 : 0.97 }}
      className={clsx(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon}
      {children}
    </motion.button>
  );
}

// Badge Component
export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
    orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
    gradient: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
    'gradient-purple': 'bg-gradient-to-r from-purple-500 to-blue-500 text-white',
  };

  return (
    <span className={clsx('badge', variants[variant], className)}>
      {children}
    </span>
  );
}

// Card Component
export function Card({ children, className = '', hover = true, glass = false, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
      className={clsx(
        glass ? 'glass-card' : 'card',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Input Component
export function Input({ label, error, icon, className = '', ...props }) {
  return (
    <div className={clsx('space-y-1', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          className={clsx('input-base', icon && 'pl-10', error && 'border-red-500 focus:ring-red-500')}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// Select Component
export function Select({ label, options = [], error, className = '', ...props }) {
  return (
    <div className={clsx('space-y-1', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <select
        className={clsx('input-base', error && 'border-red-500')}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// Textarea Component
export function Textarea({ label, error, className = '', ...props }) {
  return (
    <div className={clsx('space-y-1', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <textarea
        className={clsx('input-base resize-none', error && 'border-red-500')}
        rows={4}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// Skeleton Component
export function Skeleton({ className = '', rounded = 'rounded-lg' }) {
  return <div className={clsx('shimmer', rounded, className)} />;
}

// SkeletonCard
export function SkeletonCard() {
  return (
    <div className="card p-4 space-y-3">
      <Skeleton className="h-48 w-full" rounded="rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-8 w-24" rounded="rounded-xl" />
      </div>
    </div>
  );
}

// Modal Component
export function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className={clsx('relative w-full bg-white dark:bg-gray-900 rounded-2xl shadow-premium z-10', sizes[size])}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </motion.div>
  );
}

// Progress Bar
export function ProgressBar({ value, max = 100, color = 'orange', size = 'md', showLabel = false }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const colors = {
    orange: 'from-orange-400 to-red-500',
    green: 'from-green-400 to-emerald-500',
    red: 'from-red-400 to-rose-500',
    purple: 'from-purple-400 to-blue-500',
    yellow: 'from-yellow-400 to-orange-400',
  };
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };

  return (
    <div className="w-full">
      <div className={clsx('w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden', heights[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={clsx('h-full bg-gradient-to-r rounded-full', colors[color])}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{value}</span>
          <span>{pct.toFixed(0)}%</span>
        </div>
      )}
    </div>
  );
}

// Avatar
export function Avatar({ name, src, size = 'md', className = '' }) {
  const sizes = { xs: 'w-6 h-6 text-xs', sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-xl', '2xl': 'w-24 h-24 text-3xl' };
  const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';
  const colors = ['from-orange-400 to-red-500', 'from-purple-400 to-blue-500', 'from-emerald-400 to-teal-500', 'from-pink-400 to-rose-500', 'from-yellow-400 to-orange-500'];
  const colorIdx = name ? name.charCodeAt(0) % colors.length : 0;

  if (src) {
    return <img src={src} alt={name} className={clsx('rounded-full object-cover', sizes[size], className)} />;
  }

  return (
    <div className={clsx('rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold flex-shrink-0', sizes[size], colors[colorIdx], className)}>
      {initials}
    </div>
  );
}

// Star Rating
export function StarRating({ rating, reviews, size = 'sm' }) {
  const sizes = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(s => (
          <svg key={s} className={clsx(sizes[size], s <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600')} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {rating} {reviews && `(${reviews})`}
      </span>
    </div>
  );
}

// VegIcon
export function VegIcon({ isVeg }) {
  return (
    <div className={clsx('w-5 h-5 border-2 rounded-sm flex items-center justify-center flex-shrink-0',
      isVeg ? 'border-green-500' : 'border-red-500')}>
      <div className={clsx('w-2.5 h-2.5 rounded-full', isVeg ? 'bg-green-500' : 'bg-red-500')} />
    </div>
  );
}

// Empty State
export function EmptyState({ icon, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">{description}</p>
      {action}
    </motion.div>
  );
}

// Divider
export function Divider({ label }) {
  if (!label) return <div className="border-t border-gray-100 dark:border-gray-800" />;
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
      <span className="text-sm text-gray-400 dark:text-gray-500">{label}</span>
      <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
    </div>
  );
}

// Tooltip
export function Tooltip({ content, children }) {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  );
}

// PageHeader
export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
        {subtitle && <p className="text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}

// AnimatedCounter
export function AnimatedCounter({ end, prefix = '', suffix = '', duration = 2 }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {prefix}{end}{suffix}
    </motion.span>
  );
}
