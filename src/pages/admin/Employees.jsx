import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Search, Star } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import useUsers from '../../hooks/useUsers';
import { PageHeader, Avatar } from '../../components/ui/index';

export default function Employees() {
  const [search, setSearch] = useState('');
  const { users = [] } = useUsers();
  const EMPLOYEES = users.filter(u => u.role && u.role !== 'customer');

  const filtered = EMPLOYEES.filter(e => (e.name || '').toLowerCase().includes(search.toLowerCase()) || (e.role || '').toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <PageHeader title="Staff & Employees" subtitle={`Total active staff members: ${EMPLOYEES.length}`} />

      <div className="mb-6 max-w-sm relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search staff..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-white text-sm focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map(emp => (
          <motion.div
            key={emp.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 rounded-3xl p-5 border border-gray-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Avatar name={emp.name} size="md" />
                <div>
                  <h3 className="font-bold text-white text-base">{emp.name}</h3>
                  <p className="text-xs text-orange-400 font-semibold">{emp.role}</p>
                </div>
              </div>

                <div className="space-y-2 text-xs text-gray-400 border-t border-gray-800 pt-3">
                <div className="flex justify-between"><span>Department:</span><span className="text-white font-medium">{emp.department}</span></div>
                <div className="flex justify-between"><span>Shift:</span><span className="text-white font-medium">{emp.shift}</span></div>
                <div className="flex justify-between"><span>Joined:</span><span className="text-white font-medium">{emp.joinDate}</span></div>
                <div className="flex justify-between"><span>Rating:</span><span className="text-yellow-400 font-bold flex items-center gap-1"><Star className="w-3 h-3 fill-current" />{emp.rating ?? '-'}</span></div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between items-center text-xs">
              <span className="text-gray-400">Monthly Salary</span>
              <span className="font-bold text-emerald-400">₹{((emp.salary ?? 0)).toLocaleString()}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </AdminLayout>
  );
}
