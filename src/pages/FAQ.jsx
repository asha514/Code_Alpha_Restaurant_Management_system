import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import useSiteMeta from '../hooks/useSiteMeta';

export default function FAQ() {
  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'General', 'Orders', 'Reservations', 'Menu', 'Payment'];

  const { meta } = useSiteMeta();
  const FAQ_DATA = meta.FAQ_DATA || [];

  const filtered = FAQ_DATA.filter(faq => {
    const matchesCat = selectedCat === 'All' || faq.category === selectedCat;
    const matchesSearch = faq.question.toLowerCase().includes(search.toLowerCase()) || faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-orange-600 to-red-600 py-16 text-white text-center">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 mb-4">
              <HelpCircle className="w-4 h-4" /> Help Center
            </span>
            <h1 className="text-4xl sm:text-5xl font-black mb-3">Frequently Asked Questions</h1>
            <p className="text-orange-100 max-w-xl mx-auto mb-8">
              Have questions about ordering, table reservations, or our menu? We're here to help!
            </p>

            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-gray-900 shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12 max-w-4xl">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-8 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCat === cat
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-800 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filtered.map(faq => (
            <div
              key={faq.id}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-card overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-900 dark:text-white text-base hover:text-orange-500 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${activeId === faq.id ? 'rotate-180 text-orange-500' : ''}`} />
              </button>

              <AnimatePresence>
                {activeId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-50 dark:border-gray-800 mt-1">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
