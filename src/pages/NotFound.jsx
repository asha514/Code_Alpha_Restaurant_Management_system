import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Utensils } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';

export default function NotFound() {
  return (
    <MainLayout hideFooter>
      <div className="min-h-[80vh] flex items-center justify-center container-custom text-center py-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md">
          <div className="text-8xl mb-6 font-black gradient-text">404</div>
          <div className="text-6xl mb-6">🍽️</div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3">Dish Not Found!</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            Oops! The page you're looking for seems to have been eaten or moved to another kitchen.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-500/30 transition-all flex items-center gap-2"
            >
              <Home className="w-4 h-4" /> Back to Home
            </Link>
            <Link
              to="/menu"
              className="px-6 py-3.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold rounded-2xl hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <Utensils className="w-4 h-4" /> View Menu
            </Link>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
