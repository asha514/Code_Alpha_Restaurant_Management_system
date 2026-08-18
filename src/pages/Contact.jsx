import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import MainLayout from '../components/layout/MainLayout';
import useSiteMeta from '../hooks/useSiteMeta';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Thank you! Your message has been sent. We will get back to you shortly.');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const { meta } = useSiteMeta();
  const RESTAURANT_INFO = meta.RESTAURANT_INFO || {};

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-orange-600 to-red-600 py-16 text-white text-center">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 mb-4">
              <MessageSquare className="w-4 h-4" /> Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-black mb-3">Contact Us</h1>
            <p className="text-orange-100 max-w-xl mx-auto">
              We'd love to hear from you! Reach out for reservations, private dining inquiries, or feedback.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Info cards */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-card border border-gray-100 dark:border-gray-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">Our Location</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{RESTAURANT_INFO.address}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-card border border-gray-100 dark:border-gray-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">Phone & Email</h3>
                <p className="text-sm text-gray-500">{RESTAURANT_INFO.phone}</p>
                <p className="text-sm text-gray-500">{RESTAURANT_INFO.email}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-card border border-gray-100 dark:border-gray-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">Opening Hours</h3>
                <p className="text-sm text-gray-500">Mon – Sun: {RESTAURANT_INFO.openTime} – {RESTAURANT_INFO.closeTime}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-card border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="input-base"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Your Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="input-base"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="input-base"
                  placeholder="Private Event Inquiry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="input-base resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
