import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Mail, Phone, Calendar } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import useUsers from '../../hooks/useUsers';
import { PageHeader, Avatar } from '../../components/ui/index';

export default function Customers() {
  const [search, setSearch] = useState('');
  const { users: CUSTOMERS = [] } = useUsers();

  const filtered = CUSTOMERS.filter(c => (c.name || '').toLowerCase().includes(search.toLowerCase()) || (c.email || '').toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <PageHeader title="Customer Directory" subtitle={`Total registered customers: ${CUSTOMERS.length}`} />

      <div className="mb-6 max-w-sm relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-white text-sm focus:outline-none"
        />
      </div>

      <div className="bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-gray-800/60 text-gray-300 uppercase text-xs">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Total Orders</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Tier</th>
                <th className="p-4">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={c.name} size="sm" />
                      <span className="font-bold text-white text-sm">{c.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-xs">
                    <p>{c.email}</p>
                    <p className="text-gray-500">{c.phone}</p>
                  </td>
                  <td className="p-4 font-bold text-white">{c.totalOrders}</td>
                  <td className="p-4 font-bold text-orange-400">₹{((c.totalSpent ?? 0)).toLocaleString()}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-400">
                      {c.tier}
                    </span>
                  </td>
                  <td className="p-4 text-xs">{c.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
