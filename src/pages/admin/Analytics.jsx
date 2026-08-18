import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import AdminLayout from '../../components/layout/AdminLayout';
import { dashboard as dashboardApi } from '../../services/api';
import { PageHeader } from '../../components/ui/index';

export default function Analytics() {
  const [timeframe, setTimeframe] = useState('weekly');
  const [ANALYTICS, setAnalytics] = useState({ weekly: [], daily: [], monthly: [] });

  useEffect(() => {
    let mounted = true;
    dashboardApi.reports().then(data => { if (!mounted) return; setAnalytics(data || {}); }).catch(() => {});
    return () => { mounted = false; };
  }, []);

  return (
    <AdminLayout>
      <PageHeader title="Business Analytics" subtitle="Deep dive into restaurant performance and revenue trends" />

      {/* Timeframe picker */}
      <div className="flex gap-2 mb-6">
        {['daily', 'weekly', 'monthly'].map(tf => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              timeframe === tf ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-900 text-gray-400 border border-gray-800'
            }`}
          >
            {tf} Revenue
          </button>
        ))}
      </div>

      {/* Main Chart */}
      <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800 mb-8">
        <h3 className="text-lg font-bold text-white mb-2">Revenue Growth ({timeframe})</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timeframe === 'weekly' ? ANALYTICS.weekly : timeframe === 'daily' ? ANALYTICS.daily : ANALYTICS.monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis dataKey={timeframe === 'weekly' ? 'day' : timeframe === 'daily' ? 'time' : 'month'} stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px', color: '#fff' }} />
              <Bar dataKey="revenue" fill="#F97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminLayout>
  );
}
