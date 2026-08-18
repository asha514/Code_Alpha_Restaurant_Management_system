import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, AlertTriangle, AlertCircle, Search } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import useInventory from '../../hooks/useInventory';
import { PageHeader, ProgressBar } from '../../components/ui/index';

export default function Inventory() {
  const { items = [], loading } = useInventory();
  const [search, setSearch] = useState('');
  const [localItems, setLocalItems] = useState(items);

  useEffect(() => { setLocalItems(items); }, [items]);

  const filtered = localItems.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || (i.category || '').toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <PageHeader title="Inventory Management" subtitle="Track raw ingredients, stock levels, and expiry alerts" />

      {/* Toolbar */}
      <div className="mb-6 max-w-sm relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search inventory..."
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
                <th className="p-4">Item Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Stock Level</th>
                <th className="p-4">Unit Price</th>
                <th className="p-4">Expiry Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="p-4 font-bold text-white">{item.name}</td>
                  <td className="p-4">{item.category}</td>
                  <td className="p-4 w-48">
                    <div className="flex justify-between text-xs mb-1 text-gray-300">
                      <span>{item.stock} {item.unit}</span>
                      <span>Max: {item.maxStock}</span>
                    </div>
                    <ProgressBar
                      value={item.stock}
                      max={item.maxStock}
                      color={item.status === 'out' ? 'red' : item.status === 'low' ? 'yellow' : 'green'}
                      size="sm"
                    />
                  </td>
                  <td className="p-4 font-bold text-orange-400">₹{item.price}</td>
                  <td className="p-4 text-xs">{item.expiryDate}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                      item.status === 'out' ? 'bg-red-500/20 text-red-400' :
                      item.status === 'low' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {item.status === 'out' ? 'Out of Stock' : item.status === 'low' ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
