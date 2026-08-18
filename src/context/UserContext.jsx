import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/api';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('savoria-user') || 'null'); }
    catch { return null; }
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('savoria-admin') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('savoria-user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('savoria-admin', isAdmin);
  }, [isAdmin]);

  const login =async (email, password) => {
    try {
      console.debug('[user] login request', { email });
      const res = await auth.login({ email, password });
      console.debug('[user] login response', res);
      const { token, user: u } = res || {};
      localStorage.setItem('rms_token', token);
      setUser(u);
      setIsAdmin(u?.role === 'admin');
      const redirect = u?.role === 'admin' ? '/admin' : '/';
      return { success: true, redirect };
    } catch (err) {
      console.warn('[user] login error', err?.response?.data || err.message);
      return { success: false, error: err?.response?.data?.message || err.message };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('savoria-user');
    localStorage.removeItem('savoria-admin');
    localStorage.removeItem('rms_token');
  };

  const updateUser = (data) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  useEffect(() => {
    const token = localStorage.getItem('rms_token');
    if (!token) return;
    let mounted = true;
    auth.profile().then(res => {
      if (!mounted) return;
      setUser(res.user);
      setIsAdmin(res.user.role === 'admin');
    }).catch(() => { localStorage.removeItem('rms_token'); });
    return () => { mounted = false; };
  }, []);

  return (
    <UserContext.Provider value={{ user, isAdmin, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};
