import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, MapPin, Phone, Mail, Star, Edit3, Save, X, Heart, ShoppingBag } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { useUser } from '../context/UserContext';
import { useWishlist } from '../context/WishlistContext';
import { Avatar, Button } from '../components/ui/index';
import useOrders from '../hooks/useOrders';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, updateUser } = useUser();
  const { wishlist } = useWishlist();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', address: user?.address || '', dob: user?.dob || '' });
  const [activeTab, setActiveTab] = useState('overview');

  const handleSave = () => {
    updateUser(form);
    setEditing(false);
    toast.success('Profile updated!');
  };

  if (!user) return (
    <MainLayout>
      <div className="container-custom py-20 text-center">
        <div className="text-6xl mb-4">👤</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Please sign in</h2>
        <Link to="/login" className="text-orange-500 hover:text-orange-600">Sign In →</Link>
      </div>
    </MainLayout>
  );

  const tabs = ['overview', 'orders', 'wishlist'];
  const { orders = [] } = useOrders();
  const tierColors = { Platinum: 'from-gray-400 to-gray-600', Gold: 'from-yellow-400 to-orange-500', Silver: 'from-gray-300 to-gray-500', Bronze: 'from-orange-700 to-orange-900' };

  return (
    <MainLayout>
      <div className="container-custom py-10">
        {/* Profile header */}
        <div className="relative bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1)_0%,_transparent_60%)]" />
          <div className="relative flex flex-col sm:flex-row items-center sm:items-end gap-5">
            <div className="relative group">
              <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white/30 shadow-xl">
                <Avatar name={user.name} size="2xl" />
              </div>
              <button className="absolute inset-0 rounded-3xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="text-white text-center sm:text-left flex-1">
              <h1 className="text-3xl font-black">{user.name}</h1>
              <p className="text-orange-100">{user.email}</p>
              <div className="flex flex-wrap gap-3 mt-3 justify-center sm:justify-start">
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${tierColors[user.tier || 'Gold']}`}>
                  ⭐ {user.tier || 'Gold'} Member
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/20 text-white">
                  🎁 {(user.loyaltyPoints ?? 0).toLocaleString()} Points
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/20 text-white">
                  📅 Joined {user.joinDate}
                </span>
              </div>
            </div>
            {!editing && (
              <button onClick={() => setEditing(true)} className="flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-colors text-sm font-medium">
                <Edit3 className="w-4 h-4" /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white dark:bg-gray-900 rounded-2xl p-1.5 shadow-card border border-gray-100 dark:border-gray-800 w-fit">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${activeTab === tab ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats */}
            <div className="lg:col-span-1 space-y-4">
              {[
                { icon: ShoppingBag, label: 'Total Orders', value: orders.length, color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20' },
                { icon: Heart, label: 'Wishlist Items', value: wishlist.length, color: 'text-red-500 bg-red-50 dark:bg-red-900/20' },
                { icon: Star, label: 'Loyalty Points', value: (user.loyaltyPoints ?? 0).toLocaleString(), color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-card border border-gray-100 dark:border-gray-800 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${s.color}`}><Icon className="w-6 h-6" /></div>
                    <div>
                      <p className="text-2xl font-black text-gray-900 dark:text-white">{s.value}</p>
                      <p className="text-gray-400 text-sm">{s.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Personal info */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900 dark:text-white text-lg">Personal Information</h2>
                {editing && (
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(false)} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800">
                      <X className="w-4 h-4" /> Cancel
                    </button>
                    <button onClick={handleSave} className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium">
                      <Save className="w-4 h-4" /> Save
                    </button>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { icon: User, label: 'Full Name', key: 'name', type: 'text' },
                  { icon: Phone, label: 'Phone', key: 'phone', type: 'tel' },
                  { icon: Mail, label: 'Email', key: 'email', type: 'email', readonly: true },
                ].map(field => {
                  const Icon = field.icon;
                  return (
                    <div key={field.key}>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5" /> {field.label}
                      </label>
                      {editing && !field.readonly ? (
                        <input type={field.type} value={form[field.key] || ''} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))} className="input-base" />
                      ) : (
                        <p className="text-gray-900 dark:text-white font-medium">{user[field.key] || '—'}</p>
                      )}
                    </div>
                  );
                })}
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Address
                  </label>
                  {editing ? (
                    <textarea value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="input-base resize-none" rows={2} />
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium">{user.address || '—'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.map(order => {
              const items = Array.isArray(order.items) ? order.items : [];
              return (
                <div key={order.id || 'order'} className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-card border border-gray-100 dark:border-gray-800 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {items.slice(0, 3).map((item, i) => (
                      <img key={i} src={item?.image || ''} alt={item?.name || 'Order item'} className="w-10 h-10 rounded-xl object-cover border-2 border-white dark:border-gray-900" />
                    ))}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{order.id || 'Order'}</p>
                    <p className="text-gray-400 text-xs">{order.date || ''} • {items.length} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">₹{order.total ?? 0}</p>
                    <span className={`text-xs font-medium ${order.status === 'delivered' ? 'text-green-500' : order.status === 'preparing' ? 'text-orange-500' : 'text-gray-400'} capitalize`}>{order.status || 'unknown'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Wishlist tab */}
        {activeTab === 'wishlist' && (
          wishlist.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-7xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h3>
              <p className="text-gray-400 mb-6">Add items to your wishlist to see them here.</p>
              <Link to="/menu" className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl">Browse Menu</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {wishlist.map(item => (
                <Link key={item.id} to={`/menu/${item.id}`} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-card-hover transition-all group">
                  <div className="relative overflow-hidden h-40">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-2 right-2 w-7 h-7 bg-red-500 rounded-xl flex items-center justify-center">
                      <Heart className="w-3.5 h-3.5 text-white fill-white" />
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">{item.name}</p>
                    <p className="text-orange-500 font-bold text-sm">₹{item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )
        )}
      </div>
    </MainLayout>
  );
}
