import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '../cart/CartDrawer';
import FloatingCart from '../common/FloatingCart';
import BackToTop from '../common/BackToTop';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export default function MainLayout({ children, hideFooter = false }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.08),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.08),_transparent_30%)] dark:bg-gray-950 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      {!hideFooter && <Footer />}
      <CartDrawer />
      <FloatingCart />
      <BackToTop />
    </div>
  );
}
