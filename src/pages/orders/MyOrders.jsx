import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ChevronDown, ChevronUp, Clock, MapPin, CreditCard, X, Download, Check } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import useOrders from '../../hooks/useOrders';
import { Badge } from '../../components/ui/index';

const statusConfig = {
  placed: { label: 'Placed', color: 'blue', icon: '📝' },
  confirmed: { label: 'Confirmed', color: 'purple', icon: '✅' },
  preparing: { label: 'Preparing', color: 'yellow', icon: '🍳' },
  cooking: { label: 'Cooking', color: 'orange', icon: '🔥' },
  ready: { label: 'Ready', color: 'emerald', icon: '📦' },
  delivered: { label: 'Delivered', color: 'green', icon: '🏠' },
  cancelled: { label: 'Cancelled', color: 'red', icon: '❌' },
};

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[order?.status] || statusConfig.placed;

  const orderItems = Array.isArray(order.items) ? order.items : [];
  const orderTimeline = Array.isArray(order.timeline) ? order.timeline : [];

  return (
    <motion.div
      layout
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-card border border-gray-100 dark:border-gray-800 overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 flex items-center justify-center text-2xl">
            {status.icon}
          </div>
          <div>
            <p className="font-bold text-gray-900 dark:text-white">{order.id}</p>
            <p className="text-sm text-gray-400">{order?.date ?? ''} at {order?.time ?? ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
            order.status === 'delivered' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
            order.status === 'preparing' || order.status === 'cooking' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' :
            order.status === 'cancelled' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
            'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
          }`}>
            {status.label}
          </span>
          <span className="font-black text-gray-900 dark:text-white text-lg">₹{((order.total ?? 0)).toLocaleString()}</span>
          <button onClick={() => setExpanded(!expanded)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-400">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Items preview */}
      <div className="px-5 pb-4">
        <div className="flex -space-x-2 mb-2">
          {orderItems.slice(0, 4).map((item, i) => (
            <img key={i} src={item?.image || ''} alt={item?.name || 'Order item'} className="w-10 h-10 rounded-xl object-cover border-2 border-white dark:border-gray-900" />
          ))}
          {orderItems.length > 4 && <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs font-bold text-gray-500">+{orderItems.length - 4}</div>}
        </div>
        <p className="text-sm text-gray-400">{orderItems.map(i => `${String(i?.name || 'Item')} x${Number(i?.quantity ?? 0)}`).join(', ')}</p>
      </div>

      {/* Expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-gray-100 dark:border-gray-800"
          >
            <div className="p-5 space-y-6">
              {/* Timeline */}
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-4">Order Timeline</h4>
                <div className="relative pl-6 space-y-4">
                  {orderTimeline.map((step, i) => (
                    <div key={step.status} className="relative flex items-start gap-3">
                      <div className={`absolute -left-6 top-0 w-4 h-4 rounded-full border-2 ${step.done ? 'bg-emerald-500 border-emerald-500' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'} flex items-center justify-center`}>
                        {step.done && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      {i < order.timeline.length - 1 && <div className={`absolute left-[-17px] top-4 w-0.5 h-6 ${step.done ? 'bg-emerald-400' : 'bg-gray-200 dark:bg-gray-700'}`} />}
                      <div>
                        <p className={`text-sm font-semibold capitalize ${step.done ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                          {statusConfig[step.status]?.label || step.status}
                        </p>
                        {step.time && <p className="text-xs text-gray-400">{step.time}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items */}
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-3">Items Ordered</h4>
                <div className="space-y-2">
                  {orderItems.map(item => (
                    <div key={item?.id || `${order.id}-${item?.name || 'item'}`} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                      <img src={item?.image || ''} alt={item?.name || 'Order item'} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{item?.name || 'Item'}</p>
                        <p className="text-xs text-gray-400">x{Number(item?.quantity ?? 0)}</p>
                      </div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">₹{(Number(item?.price ?? 0) * Number(item?.quantity ?? 0)).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Price breakdown */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Subtotal</span><span>₹{((order.subtotal ?? 0)).toLocaleString()}</span></div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>GST</span><span>₹{((order.gst ?? 0)).toLocaleString ? (order.gst ?? 0).toLocaleString() : (order.gst ?? 0)}</span></div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Delivery</span><span>{(order.deliveryCharge ?? 0) === 0 ? 'FREE' : `₹${order.deliveryCharge ?? 0}`}</span></div>
                {(order.discount ?? 0) > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{order.discount ?? 0}</span></div>}
                <div className="flex justify-between font-bold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-2"><span>Total</span><span>₹{((order.total ?? 0)).toLocaleString()}</span></div>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="flex items-start gap-2 text-gray-500"><MapPin className="w-4 h-4 mt-0.5 text-orange-500" />{order.address}</div>
                <div className="flex items-center gap-2 text-gray-500"><CreditCard className="w-4 h-4 text-orange-500" />{order.paymentMethod}</div>
                {order.estimatedTime && <div className="flex items-center gap-2 text-gray-500"><Clock className="w-4 h-4 text-orange-500" />Estimated: {order.estimatedTime}</div>}
              </div>

              {order.status === 'delivered' && (
                <button className="w-full flex items-center justify-center gap-2 py-3 border border-orange-500 text-orange-500 rounded-xl font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors text-sm">
                  <Download className="w-4 h-4" /> Download Invoice
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function MyOrders() {
  const [filter, setFilter] = useState('all');
  const tabs = ['all', 'preparing', 'delivered', 'cancelled'];
  const { orders: ORDERS = [], loading } = useOrders();
  const filtered = filter === 'all' ? ORDERS : ORDERS.filter(o => o.status === filter);

  return (
    <MainLayout>
      <div className="container-custom py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">My Orders</h1>
            <p className="text-gray-400 mt-1">{ORDERS.length} total orders</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap transition-all ${filter === tab ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-orange-300'}`}>
              {tab === 'all' ? 'All Orders' : tab}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-7xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No orders found</h2>
            <p className="text-gray-400 mb-6">You haven't placed any orders yet. Let's fix that!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(order => <OrderCard key={order.id} order={order} />)}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
