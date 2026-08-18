import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-950">
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop"
          alt="Restaurant"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-black/60" />
        <div className="relative flex flex-col justify-center px-14 text-white">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Utensils className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-black">Savoria</div>
              <div className="text-white/60 text-sm">Premium Dining</div>
            </div>
          </div>
          <h2 className="text-5xl font-black mb-4 leading-tight">A World of<br />Flavours Awaits</h2>
          <p className="text-white/70 text-lg max-w-xs">Create your account, recover access, and enjoy a refined dining experience.</p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { num: '45K+', label: 'Orders Served' },
              { num: '4.8★', label: 'Average Rating' },
              { num: '30+', label: 'Menu Items' },
              { num: '12+', label: 'Expert Chefs' },
            ].map(s => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-2xl font-black text-orange-300">{s.num}</div>
                <div className="text-white/60 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white dark:bg-gray-950">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black gradient-text">Savoria</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">{title}</h1>
            <p className="text-gray-500 dark:text-gray-400">{subtitle}</p>
          </div>

          {children}

          {footer && <div className="mt-6 text-center">{footer}</div>}
        </motion.div>
      </div>
    </div>
  );
}
