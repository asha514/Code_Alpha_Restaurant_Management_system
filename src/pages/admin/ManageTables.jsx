import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Table2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import useTables from '../../hooks/useTables';
import { PageHeader } from '../../components/ui/index';
import toast from 'react-hot-toast';

export default function ManageTables() {
  const { tables: TABLES = [] } = useTables();
  const [tablesList, setTablesList] = useState([]);

  useEffect(() => {
    setTablesList(TABLES);
  }, [TABLES]);

  const updateTableStatus = (id, newStatus) => {
    setTablesList(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    toast.success(`Table ${id} status set to ${newStatus}`);
  };

  const statusColors = {
    available: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    occupied: 'bg-red-500/20 text-red-400 border-red-500/30',
    reserved: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    cleaning: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  return (
    <AdminLayout>
      <PageHeader title="Manage Restaurant Tables" subtitle="Real-time status management for restaurant seating" />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {tablesList.map(table => (
          <motion.div
            key={table.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-3xl p-5 border border-gray-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-black text-white">#{table.number}</span>
                <span className="text-xs text-gray-400 font-semibold">{table.capacity} Seats</span>
              </div>
              <p className="text-xs text-gray-400 mb-4">{table.section} Section</p>
            </div>

            <select
              value={table.status}
              onChange={e => updateTableStatus(table.id, e.target.value)}
              className={`w-full text-xs font-bold rounded-xl px-3 py-2 border capitalize focus:outline-none bg-gray-800 ${statusColors[table.status]}`}
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="reserved">Reserved</option>
              <option value="cleaning">Cleaning</option>
            </select>
          </motion.div>
        ))}
      </div>
    </AdminLayout>
  );
}
