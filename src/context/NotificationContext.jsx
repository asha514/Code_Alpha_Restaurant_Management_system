import { createContext, useContext, useState, useEffect } from 'react';
import { NOTIFICATIONS_DATA } from '../data/mockData';
import { notifications as notificationsApi } from '../services/api';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    try { return JSON.parse(localStorage.getItem('savoria-notifications') || JSON.stringify(NOTIFICATIONS_DATA)); }
    catch { return NOTIFICATIONS_DATA; }
  });

  useEffect(() => {
    let mounted = true;
    notificationsApi.list().then(data => {
      if (!mounted) return;
      if (Array.isArray(data) && data.length) {
        console.debug('[notifications] loaded from API', data.length);
        setNotifications(data);
      }
    }).catch(err => { console.warn('[notifications] api error', err?.response?.status, err?.response?.data); });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    localStorage.setItem('savoria-notifications', JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (notif) => {
    setNotifications(prev => [{ ...notif, id: Date.now(), read: false, time: 'Just now' }, ...prev]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{
      notifications, unreadCount, markRead, markAllRead, addNotification, removeNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
};
