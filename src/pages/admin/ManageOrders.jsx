import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, CheckCircle2, ChevronRight, Filter } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import useOrders from '../../hooks/useOrders';
import { PageHeader } from '../../components/ui/index';
import toast from 'react-hot-toast';

export default function ManageOrders() {
  const { orders: ORDERS = [] } = useOrders();
  const [ordersList, setOrdersList] = useState([]);
  const [activeStatus, setActiveStatus] = useState('all');

  const statuses = ['all', 'preparing', 'cooking', 'ready', 'delivered', 'cancelled'];

  useEffect(() => {
    setOrdersList(Array.isArray(ORDERS) ? ORDERS : []);
  }, [ORDERS]);

  const updateStatus = (id, newStatus) => {
    setOrdersList(ordersList.map(o => o.id === id ? { ...o, status: newStatus } : o));
    toast.success(`Order ${id} status changed to ${newStatus}`);
  };

  const filtered = activeStatus === 'all' ? ordersList : ordersList.filter(o => o.status === activeStatus);

  return (
    <AdminLayout>
      <PageHeader title="Manage Orders" subtitle="Track live incoming orders and manage order status" />

      {/* Status tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-6">
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setActiveStatus(s)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize whitespace-nowrap transition-all ${
              activeStatus === s
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-gray-900 text-gray-400 border border-gray-800 hover:text-white'
            }`}
          >
            {s === 'all' ? 'All Orders' : s} ({s === 'all' ? ordersList.length : ordersList.filter(o => o.status === s).length})
          </button>
        ))}
      </div>

      {/* Orders Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(order => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 rounded-3xl p-6 border border-gray-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-black text-white text-base">{order.id}</span>
                <select
                  value={order.status}
                  onChange={e => updateStatus(order.id, e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-xs font-bold text-orange-400 rounded-xl px-2.5 py-1 focus:outline-none"
                >
                  <option value="placed">Placed</option>
                  <option value="preparing">Preparing</option>
                  <option value="cooking">Cooking</option>
                  <option value="ready">Ready</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <p className="text-xs text-gray-400 mb-4">{order.date} • {order.time}</p>

              <div className="space-y-2 border-t border-b border-gray-800 py-3 mb-4 max-h-40 overflow-y-auto no-scrollbar">
                {(Array.isArray(order.items) ? order.items : []).map(item => (
                  <div key={item?.id || `${order.id}-${item?.name || 'item'}` } className="flex justify-between text-xs text-gray-300">
                    <span>{item?.name || 'Item'} x{item?.quantity ?? 0}</span>
                    <span className="font-semibold text-white">₹{(item?.price ?? 0) * (item?.quantity ?? 0)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-sm font-bold text-white mb-2">
                <span>Total Amount</span>
                <span className="text-orange-400 text-base">₹{order.total}</span>
              </div>
              <p className="text-xs text-gray-400 truncate">📍 {order.address}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </AdminLayout>
  );
}
