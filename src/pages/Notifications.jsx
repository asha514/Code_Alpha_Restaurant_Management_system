import { motion } from 'framer-motion';
import { Bell, CheckCircle2, Trash2, Check, Tag, Calendar, ShoppingBag, ShieldAlert } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { useNotifications } from '../context/NotificationContext';
import { Button, EmptyState } from '../components/ui/index';

export default function Notifications() {
  const { notifications, unreadCount, markRead, markAllRead, removeNotification } = useNotifications();

  const getIcon = (type) => {
    switch (type) {
      case 'order': return <ShoppingBag className="w-5 h-5 text-orange-500" />;
      case 'offer': return <Tag className="w-5 h-5 text-purple-500" />;
      case 'reservation': return <Calendar className="w-5 h-5 text-blue-500" />;
      default: return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <MainLayout>
      <div className="container-custom py-10 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
              <Bell className="w-8 h-8 text-orange-500" /> Notifications
            </h1>
            <p className="text-gray-400 mt-1">Stay updated with order status, special offers, and reservations.</p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-sm font-semibold rounded-xl hover:bg-orange-100 transition-colors"
            >
              <Check className="w-4 h-4" /> Mark all read ({unreadCount})
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <EmptyState
            icon="🔔"
            title="All caught up!"
            description="You don't have any notifications right now."
          />
        ) : (
          <div className="space-y-3">
            {notifications.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => markRead(n.id)}
                className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                  !n.read
                    ? 'bg-orange-50/50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900/50 shadow-sm'
                    : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 opacity-80'
                }`}
              >
                <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex-shrink-0">
                  {getIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className={`font-bold text-sm ${!n.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {n.title}
                    </h3>
                    <span className="text-xs text-gray-400 flex-shrink-0">{n.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{n.message}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeNotification(n.id);
                  }}
                  className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
