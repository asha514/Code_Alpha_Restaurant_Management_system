import { useState, useEffect } from 'react';
import { menu } from '../services/api';

let cache = null;
const normalizeItem = (item) => ({ ...item, id: String(item.id ?? item._id ?? '') });

export default function useMenuItems() {
  const [items, setItems] = useState(() => (cache ? cache.map(item => ({ ...item })) : []));
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    if (cache) return;
    let mounted = true;
    menu.list().then(data => {
      if (!mounted) return;
      const safeData = Array.isArray(data) ? data.map(normalizeItem) : [];
      cache = safeData.map(item => ({ ...item }));
      setItems(safeData);
      setLoading(false);
    }).catch(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  return { items, loading };
}
