import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Check, X, Phone, Mail } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import useReservations from '../../hooks/useReservations';
import { PageHeader } from '../../components/ui/index';
import toast from 'react-hot-toast';

export default function ManageReservations() {
  const { reservations: RESERVATIONS = [] } = useReservations();
  const [resList, setResList] = useState([]);

  useEffect(() => {
    setResList(RESERVATIONS);
  }, [RESERVATIONS]);

  const updateStatus = (id, newStatus) => {
    setResList(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    toast.success(`Reservation ${id} ${newStatus}`);
  };

  return (
    <AdminLayout>
      <PageHeader title="Manage Reservations" subtitle="Review and confirm guest table reservations" />

      <div className="bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-gray-800/60 text-gray-300 uppercase text-xs">
              <tr>
                <th className="p-4">Guest</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Party Size</th>
                <th className="p-4">Occasion</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {resList.map(r => (
                <tr key={r.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-white text-sm">{r.name}</p>
                    <p className="text-xs text-gray-500">{r.phone}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-white text-xs font-semibold">{r.date}</p>
                    <p className="text-xs text-gray-500">{r.time}</p>
                  </td>
                  <td className="p-4 font-bold text-white">{r.guests} guests</td>
                  <td className="p-4">{r.occasion || '—'}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
                      r.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
                      r.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {r.status === 'pending' && (
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => updateStatus(r.id, 'confirmed')} className="px-3 py-1.5 bg-emerald-500 text-white rounded-xl text-xs font-bold">
                          Approve
                        </button>
                        <button onClick={() => updateStatus(r.id, 'cancelled')} className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-xl text-xs font-bold">
                          Decline
                        </button>
                      </div>
                    )}
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
