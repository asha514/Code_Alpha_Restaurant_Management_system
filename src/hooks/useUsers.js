import { useState, useEffect } from 'react';
import api from '../services/api';

const normalizeUser = (user) => ({ ...user, id: String(user.id ?? user._id ?? '') });

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.get('/users').then(r => r.data).then(data => {
      if (!mounted) return;
      const safeData = Array.isArray(data) ? data.map(normalizeUser) : [];
      setUsers(safeData);
      setLoading(false);
    }).catch(() => setLoading(false));
    return () => { mounted = false; };
  }, []);
  return { users, loading };
}
