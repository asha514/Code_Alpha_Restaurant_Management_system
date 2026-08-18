import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../../components/layout/MainLayout';
import useReservations from '../../hooks/useReservations';
import { useUser } from '../../context/UserContext';
import { Calendar, Clock, Users, CheckCircle, AlertCircle, XCircle, LoaderCircle, Eye, Trash2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { reservations as reservationApi } from '../../services/api';

export default function MyReservations() {
  const { user } = useUser();
  const { reservations, loading, error, refresh } = useReservations();
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [cancellingId, setCancellingId] = useState('');

  const statusIcon = { confirmed: CheckCircle, pending: AlertCircle, cancelled: XCircle };
  const statusColor = { confirmed: 'text-emerald-500', pending: 'text-yellow-500', cancelled: 'text-red-500' };
  const statusBg = { confirmed: 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20', pending: 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20', cancelled: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20' };

  const myReservations = useMemo(() => {
    if (!Array.isArray(reservations)) return [];
    const currentUserId = user?.id || user?._id;
    return reservations.filter((reservation) => {
      if (!currentUserId) return true;
      const reservationUserId = reservation.user?.id || reservation.user?._id || reservation.user;
      return String(reservationUserId) === String(currentUserId);
    });
  }, [reservations, user]);

  const cancelReservation = async (reservationId) => {
    setCancellingId(reservationId);
    try {
      await reservationApi.update(reservationId, { status: 'cancelled' });
      toast.success('Reservation cancelled');
      await refresh();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Unable to cancel reservation');
    } finally {
      setCancellingId('');
    }
  };

  return (
    <MainLayout>
      <div className="container-custom py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-sm font-semibold uppercase tracking-[0.25em] text-purple-600 dark:border-purple-900/40 dark:bg-purple-900/20 dark:text-purple-300">
              <Sparkles className="h-4 w-4" /> My Reservations
            </div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Your dining schedule</h1>
            <p className="mt-1 text-gray-400">{myReservations.length} reservation{myReservations.length === 1 ? '' : 's'} in your profile</p>
          </div>
          <Link to="/reservations/book" className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-2.5 font-semibold text-white shadow-md transition-all hover:from-purple-600 hover:to-blue-600">
            + New Booking
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center rounded-3xl border border-gray-100 bg-white/80 py-16 text-gray-500 shadow-card backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/80">
            <LoaderCircle className="mr-2 h-5 w-5 animate-spin" /> Loading your reservations...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-6 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300">{error}</div>
        ) : myReservations.length === 0 ? (
          <div className="rounded-3xl border border-gray-100 bg-white/80 py-20 text-center shadow-card backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/80">
            <div className="mb-4 text-7xl">📅</div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">No reservations yet</h2>
            <p className="mb-6 text-gray-400">Your upcoming dining experiences will appear here once you book a table.</p>
            <Link to="/reservations/book" className="rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-3.5 font-bold text-white">Book Now</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {myReservations.map((reservation, index) => {
              const Icon = statusIcon[reservation.status] || AlertCircle;
              const canCancel = reservation.status !== 'cancelled';
              return (
                <motion.div key={reservation.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className={`${statusBg[reservation.status] || 'border-gray-200 bg-white/70 dark:border-gray-700 dark:bg-gray-900/70'} rounded-2xl border p-5 shadow-sm`}>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${reservation.status === 'confirmed' ? 'bg-emerald-500' : reservation.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-gray-900 dark:text-white">{reservation.id}</h3>
                          <span className={`rounded-full border px-2 py-0.5 text-xs font-bold ${statusColor[reservation.status] || 'text-gray-500'} ${statusBg[reservation.status] || 'border-gray-200'}`}>{reservation.status}</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{reservation.name}</p>
                        <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {reservation.date}</span>
                          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {reservation.time}</span>
                          <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {reservation.guests} guests</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">{reservation.table?.number ? `Table ${reservation.table.number}` : 'Table assigned'} • {reservation.occasion || 'No occasion'}</p>
                        {reservation.notes && <p className="mt-1 text-xs text-gray-400">📝 {reservation.notes}</p>}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => setSelectedReservation(reservation)} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">
                        <Eye className="h-4 w-4" /> Details
                      </button>
                      {canCancel && (
                        <button disabled={cancellingId === reservation.id} onClick={() => cancelReservation(reservation.id)} className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-70 dark:border-red-900/40 dark:bg-red-950/20">
                          {cancellingId === reservation.id ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />} Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedReservation && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setSelectedReservation(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(event) => event.stopPropagation()} className="w-full max-w-lg rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-500">Reservation Details</p>
                  <h3 className="mt-1 text-2xl font-black text-gray-900 dark:text-white">{selectedReservation.id}</h3>
                </div>
                <button onClick={() => setSelectedReservation(null)} className="rounded-xl px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">Close</button>
              </div>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="rounded-2xl bg-gray-50 p-3 dark:bg-gray-800/70">
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-400">Customer</p>
                  <p className="mt-1 font-semibold text-gray-900 dark:text-white">{selectedReservation.name}</p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-3 dark:bg-gray-800/70">
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-400">Table & Guests</p>
                  <p className="mt-1 font-semibold text-gray-900 dark:text-white">{selectedReservation.table?.number ? `Table ${selectedReservation.table.number}` : 'Table assigned'} • {selectedReservation.guests} guests</p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-3 dark:bg-gray-800/70">
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-400">Date & Time</p>
                  <p className="mt-1 font-semibold text-gray-900 dark:text-white">{selectedReservation.date} • {selectedReservation.time}</p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-3 dark:bg-gray-800/70">
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-400">Status</p>
                  <p className="mt-1 font-semibold text-gray-900 dark:text-white">{selectedReservation.status}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}
