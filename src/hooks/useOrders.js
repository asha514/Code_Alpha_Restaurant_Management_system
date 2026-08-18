import { useState, useEffect } from 'react';
import { orders as ordersApi } from '../services/api';

const normalizeOrder = (order) => ({ ...order, id: String(order.id ?? order._id ?? '') });

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    ordersApi.list().then(data => {
      if (!mounted) return;
      const safeData = Array.isArray(data) ? data.map(normalizeOrder) : [];
      setOrders(safeData);
      setLoading(false);
    }).catch(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  return { orders, loading };
}
