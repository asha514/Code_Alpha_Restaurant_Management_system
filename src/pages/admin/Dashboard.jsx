import { motion } from 'framer-motion';
import React from 'react';
import { DollarSign, ShoppingBag, Users, Table2, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, Star } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import AdminLayout from '../../components/layout/AdminLayout';
import useMenuItems from '../../hooks/useMenuItems';
import useOrders from '../../hooks/useOrders';
import useSiteMeta from '../../hooks/useSiteMeta';
import { dashboard as dashboardApi } from '../../services/api';
import { PageHeader } from '../../components/ui/index';

export default function Dashboard() {
  const { meta } = useSiteMeta();
  const { orders: ORDERS = [] } = useOrders();
  const { items: MENU_ITEMS = [] } = useMenuItems();
  const [ANALYTICS, setAnalytics] = React.useState({ daily: [], categoryRevenue: [], kpi: {} });

  React.useEffect(() => {
    let mounted = true;
    dashboardApi.stats().then(data => { if (!mounted) return; setAnalytics(prev => ({ ...prev, kpi: { totalRevenue: data.totalRevenue || 0, totalOrders: data.totalOrders || 0, totalCustomers: data.totalCustomers || 0, tableOccupancy: data.tableOccupancy || 0 } })); }).catch(() => {});
    return () => { mounted = false; };
  }, []);

  const kpi = ANALYTICS.kpi || {};
  const recentOrders = ORDERS.slice(0, 5);
  const topSelling = MENU_ITEMS.filter(i => i.isBestSeller).slice(0, 4);

  const kpiCards = [
    { title: 'Total Revenue', value: `₹${(Number(kpi.totalRevenue ?? 0) / 100000).toFixed(2)}L`, growth: `+${kpi.revenueGrowth ?? 0}%`, isUp: true, icon: DollarSign, color: 'from-orange-500 to-red-500' },
    { title: 'Orders Today', value: (Number(kpi.totalOrders ?? 0)).toLocaleString(), growth: `+${kpi.ordersGrowth ?? 0}%`, isUp: true, icon: ShoppingBag, color: 'from-purple-500 to-blue-500' },
    { title: 'Customers', value: (Number(kpi.totalCustomers ?? 0)).toLocaleString(), growth: `+${kpi.customersGrowth ?? 0}%`, isUp: true, icon: Users, color: 'from-emerald-500 to-teal-500' },
    { title: 'Table Occupancy', value: `${kpi.tableOccupancy ?? 0}%`, growth: `+${kpi.occupancyGrowth ?? 0}%`, isUp: true, icon: Table2, color: 'from-yellow-500 to-amber-500' },
  ];

  return (
    <AdminLayout>
      <PageHeader title="Dashboard Overview" subtitle="Welcome back, Admin! Here is what's happening today." />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {kpiCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-gray-900 rounded-3xl p-6 border border-gray-800 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm font-medium">{card.title}</span>
                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-lg`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-white">{card.value}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-0.5 ${card.isUp ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                  {card.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {card.growth}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-gray-900 rounded-3xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Revenue Overview</h3>
              <p className="text-xs text-gray-400">Daily sales performance</p>
            </div>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full font-semibold">
              Live Updated
            </span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ANALYTICS.daily}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                <XAxis dataKey="time" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Pie */}
        <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Sales by Category</h3>
            <p className="text-xs text-gray-400 mb-4">Revenue percentage</p>
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ANALYTICS.categoryRevenue}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {ANALYTICS.categoryRevenue.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            {ANALYTICS.categoryRevenue.map(cat => (
              <div key={cat.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-gray-400 truncate">{cat.name}</span>
                <span className="text-white font-bold ml-auto">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables & Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-gray-900 rounded-3xl p-6 border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="bg-gray-800/50 text-gray-300 uppercase text-xs">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {recentOrders.map(o => (
                  <tr key={o.id} className="hover:bg-gray-800/40 transition-colors">
                    <td className="p-3 font-semibold text-white">{o.id}</td>
                    <td className="p-3 text-xs">{o.time}</td>
                    <td className="p-3 font-bold text-orange-400">₹{o.total}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 capitalize">
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Food */}
        <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-4">Top Selling Items</h3>
          <div className="space-y-4">
            {topSelling.map(item => (
              <div key={item.id} className="flex items-center gap-3 bg-gray-800/40 p-2.5 rounded-2xl">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white text-sm truncate">{item.name}</p>
                  <p className="text-xs text-gray-400">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" /> {item.rating}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
