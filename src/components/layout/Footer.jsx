import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, MapPin, Phone, Mail, Clock, Send, Star, ChevronRight, Share2, Globe, MessageCircle, Video } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useSiteMeta from '../../hooks/useSiteMeta';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Subscribed! Welcome to Savoria family 🎉');
    setEmail('');
  };

  const quickLinks = [
    { label: 'Home', to: '/' }, { label: 'Our Menu', to: '/menu' },
    { label: 'Book a Table', to: '/reservations/book' }, { label: 'Offers', to: '/offers' },
    { label: 'About Us', to: '/about' }, { label: 'Contact', to: '/contact' },
  ];

  const support = [
    { label: 'FAQ', to: '/faq' }, { label: 'My Orders', to: '/orders' },
    { label: 'Track Order', to: '/orders' }, { label: 'Privacy Policy', to: '/about' },
    { label: 'Terms of Service', to: '/about' },
  ];

  const socials = [
    { icon: Share2, label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: Globe, label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: MessageCircle, label: 'Twitter', color: 'hover:text-sky-400' },
    { icon: Video, label: 'YouTube', color: 'hover:text-red-500' },
  ];

  const { meta } = useSiteMeta();
  const RESTAURANT_INFO = meta.RESTAURANT_INFO || { description: '', rating: 0, totalReviews: 0, phone: '', email: '', openTime: '', closeTime: '', address: '' };

  return (
    <footer className="bg-gray-950 text-gray-400 relative overflow-hidden border-t border-white/10">
      {/* Floating background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* CTA strip */}
      <div className="relative border-b border-gray-800">
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Ready for a culinary journey?</h3>
              <p className="text-gray-400">Reserve your table today and experience the finest dining.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/reservations/book" className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02]">
                Book a Table
              </Link>
              <Link to="/menu" className="px-6 py-3 border border-gray-700 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors hover:scale-[1.02]">
                View Menu
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Utensils className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-black text-white">Savoria</span>
                <div className="text-xs text-gray-500">Premium Dining</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">{RESTAURANT_INFO.description}</p>
            <div className="flex items-center gap-1 mb-4">
              {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              <span className="text-sm text-white ml-1">{RESTAURANT_INFO.rating ?? 0}</span>
              <span className="text-xs ml-1">({(RESTAURANT_INFO.totalReviews ?? 0).toLocaleString()} reviews)</span>
            </div>
            {/* Social icons */}
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, label, color }) => (
                <motion.button
                  key={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 ${color} transition-colors`}
                  title={label}
                >
                  <Icon className="w-4 h-4" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="flex items-center gap-2 text-sm hover:text-orange-400 transition-colors group">
                    <ChevronRight className="w-3.5 h-3.5 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity -ml-1.5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Support</h4>
            <ul className="space-y-2.5">
              {support.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="flex items-center gap-2 text-sm hover:text-orange-400 transition-colors group">
                    <ChevronRight className="w-3.5 h-3.5 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity -ml-1.5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact info */}
            <div className="mt-6 space-y-2.5">
              <a href={`tel:${RESTAURANT_INFO.phone}`} className="flex items-center gap-2 text-sm hover:text-orange-400 transition-colors">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" /> {RESTAURANT_INFO.phone}
              </a>
              <a href={`mailto:${RESTAURANT_INFO.email}`} className="flex items-center gap-2 text-sm hover:text-orange-400 transition-colors">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" /> {RESTAURANT_INFO.email}
              </a>
              <div className="flex items-start gap-2 text-sm">
                <Clock className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.openTime} – {RESTAURANT_INFO.closeTime} daily</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe to get exclusive offers, new menu alerts, and special deals.</p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500 text-sm transition-colors"
              />
              <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:from-orange-600 hover:to-red-600 transition-all text-sm">
                <Send className="w-4 h-4" /> Subscribe
              </button>
            </form>

            {/* App download */}
            <div className="mt-5">
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest">Download App</p>
              <div className="flex flex-col gap-2">
                {['App Store', 'Google Play'].map(store => (
                  <button key={store} className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-xs text-gray-300 transition-colors text-left border border-gray-700">
                    <span className="text-lg">{store === 'App Store' ? '🍎' : '🤖'}</span>
                    <div><div className="text-xs text-gray-500">Download on</div><div className="font-semibold">{store}</div></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs">© {new Date().getFullYear()} Savoria. All rights reserved. Made with ❤️ in Mumbai.</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
