import { motion } from 'framer-motion';
import { ChefHat, Award, Heart, Users, Utensils, Star } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import useSiteMeta from '../hooks/useSiteMeta';

export default function About() {
  const { meta } = useSiteMeta();
  const RESTAURANT_INFO = meta.RESTAURANT_INFO || {};
  const EMPLOYEES = meta.EMPLOYEES || [];
  const chefs = EMPLOYEES.filter(e => e.department === 'Kitchen');

  return (
    <MainLayout>
      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 py-20 text-white text-center relative overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-orange-200 text-sm font-semibold uppercase tracking-widest mb-2 block">Our Story</span>
            <h1 className="text-4xl sm:text-6xl font-black mb-4">About {RESTAURANT_INFO.name}</h1>
            <p className="text-orange-100 max-w-2xl mx-auto text-lg leading-relaxed">
              Crafting unforgettable culinary memories since {RESTAURANT_INFO.founded}. Experience the perfect harmony of taste, ambiance, and warmth.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="text-orange-500 font-bold text-sm uppercase tracking-widest">Heritage & Excellence</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-2 mb-6">
              A Passion For Authentic Culinary Artistry
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Founded in {RESTAURANT_INFO.founded}, Savoria was born out of a desire to create a dining destination where traditional culinary techniques meet contemporary innovation.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Every dish on our menu represents a labor of love — prepared using farm-fresh organic ingredients, signature spice blends, and time-honored cooking traditions.
            </p>

            <div className="grid grid-cols-3 gap-4 border-t border-gray-100 dark:border-gray-800 pt-6">
              <div>
                <h4 className="text-3xl font-black gradient-text">5+</h4>
                <p className="text-xs text-gray-500 font-medium mt-1">Years of Excellence</p>
              </div>
              <div>
                <h4 className="text-3xl font-black gradient-text">45K+</h4>
                <p className="text-xs text-gray-500 font-medium mt-1">Happy Guests</p>
              </div>
              <div>
                <h4 className="text-3xl font-black gradient-text">30+</h4>
                <p className="text-xs text-gray-500 font-medium mt-1">Signature Recipes</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop"
                alt="Restaurant interior"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Master Chefs */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-bold text-sm uppercase tracking-widest">Culinary Artisans</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-2">Meet Our Master Chefs</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {chefs.map((chef, i) => (
              <motion.div
                key={chef.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-card border border-gray-100 dark:border-gray-800 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-500 mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  👨‍🍳
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{chef.name}</h3>
                <p className="text-orange-500 font-semibold text-sm mb-3">{chef.role}</p>
                <div className="flex items-center justify-center gap-1 text-xs text-yellow-500 font-bold mb-4">
                  <Star className="w-4 h-4 fill-current" /> {chef.rating} Rating
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Passionate about bringing rich flavors and artistic presentation to every table.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
