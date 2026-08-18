import { useState, useEffect } from 'react';
import { inventory as invApi } from '../services/api';

const normalizeInventoryItem = (item) => ({ ...item, id: String(item.id ?? item._id ?? '') });

export default function useInventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    invApi.list().then(data => {
      if (!mounted) return;
      const safeData = Array.isArray(data) ? data.map(normalizeInventoryItem) : [];
      setItems(safeData);
      setLoading(false);
    }).catch(() => setLoading(false));
    return () => { mounted = false; };
  }, []);
  return { items, loading };
}
