import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag, MapPin, Clock, ArrowRight, Home } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';

export default function OrderSuccess() {
  const orderNum = `ORD-${Date.now().toString().slice(-6)}`;
  const steps = [
    { icon: '✅', label: 'Order Placed', done: true },
    { icon: '🍳', label: 'Preparing', done: false },
    { icon: '📦', label: 'Ready', done: false },
    { icon: '🚴', label: 'On the Way', done: false },
    { icon: '🏠', label: 'Delivered', done: false },
  ];

  return (
    <MainLayout hideFooter>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          {/* Success animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 12, delay: 0.1 }}
            className="w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30"
          >
            <CheckCircle className="w-14 h-14 text-white" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">Order Placed! 🎉</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">Your food is being prepared with love.</p>
            <p className="text-orange-500 font-bold text-xl mb-8">{orderNum}</p>
          </motion.div>

          {/* ETA card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-5 text-white mb-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-10 h-10 bg-white/20 p-2 rounded-xl" />
                <div className="text-left">
                  <p className="text-orange-100 text-sm">Estimated Delivery</p>
                  <p className="font-black text-2xl">35–45 min</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-200" />
                <div className="text-left text-sm">
                  <p className="text-orange-100">Delivering to</p>
                  <p className="font-semibold">Bandra West, Mumbai</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order timeline */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-card border border-gray-100 dark:border-gray-800 mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-left">Order Status</h3>
            <div className="flex items-center justify-between">
              {steps.map((s, i) => (
                <div key={s.label} className="flex flex-col items-center gap-1 relative flex-1">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${s.done ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg' : 'bg-gray-100 dark:bg-gray-800'}`}
                  >
                    {s.icon}
                  </motion.div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 text-center">{s.label}</span>
                  {i < steps.length - 1 && (
                    <div className={`absolute top-5 left-[60%] w-[80%] h-0.5 ${i === 0 ? 'bg-green-400' : 'bg-gray-200 dark:bg-gray-700'}`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex gap-3">
            <Link to="/orders" className="flex-1 flex items-center justify-center gap-2 py-3.5 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
              <ShoppingBag className="w-5 h-5" /> Track Order
            </Link>
            <Link to="/" className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg">
              <Home className="w-5 h-5" /> Back Home
            </Link>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
