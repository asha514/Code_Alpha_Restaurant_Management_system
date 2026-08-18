import { motion } from 'framer-motion';
import { Tag, Copy, Check, Sparkles } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import MainLayout from '../components/layout/MainLayout';
import useOffers from '../hooks/useOffers';

export default function Offers() {
  const [copiedCode, setCopiedCode] = useState(null);
  const { offers: OFFERS, loading, error } = useOffers();

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code ${code} copied!`);
    setTimeout(() => setCopiedCode(null), 3000);
  }; 

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 py-16 text-white text-center">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 mb-4">
              <Sparkles className="w-4 h-4 text-yellow-300" /> Exclusive Discounts
            </span>
            <h1 className="text-4xl sm:text-5xl font-black mb-3">Deals & Promo Codes</h1>
            <p className="text-purple-100 max-w-xl mx-auto">
              Save big on your next meal! Apply these coupon codes at checkout to unlock amazing discounts.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="rounded-3xl p-6 shadow-card border border-gray-100 dark:border-gray-800 bg-gray-100/80 dark:bg-gray-900/70 animate-pulse h-72" />
            ))}
          </div>
        ) : error ? (
          <div className="max-w-4xl mx-auto rounded-3xl p-8 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200">
            <p className="font-semibold">Unable to load offers.</p>
            <p>{error}</p>
          </div>
        ) : OFFERS.length === 0 ? (
          <div className="max-w-4xl mx-auto rounded-3xl p-8 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 text-center">
            <p className="font-semibold mb-2">No offers available right now.</p>
            <p>Check back soon for new deals and promo codes.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {OFFERS.map((offer, i) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-card border border-gray-100 dark:border-gray-800 flex flex-col justify-between relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${offer.gradient} opacity-10 rounded-bl-full pointer-events-none`} />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-4xl">{offer.icon}</span>
                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold text-xs rounded-full">
                      Min Order: ₹{offer.minOrder}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{offer.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed">{offer.description}</p>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                  <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl font-mono font-bold text-orange-600 dark:text-orange-400 text-sm tracking-wider border border-dashed border-orange-300 dark:border-orange-700">
                    {offer.code}
                  </div>

                  <button
                    onClick={() => copyCode(offer.code)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-xs font-bold hover:from-orange-600 hover:to-red-600 transition-all shadow-md"
                  >
                    {copiedCode === offer.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Code
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
