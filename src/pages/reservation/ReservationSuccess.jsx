import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, CalendarDays, Clock3, Users, ArrowRight, Home } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';

export default function ReservationSuccess() {
  const location = useLocation();
  const reservation = location.state?.reservation || null;

  return (
    <MainLayout hideFooter>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl rounded-[32px] border border-white/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl p-8 md:p-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="h-10 w-10 text-white" />
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-purple-500">Reservation Confirmed</p>
            <h1 className="mt-2 text-3xl font-black text-gray-900 dark:text-white">Your table is ready</h1>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-400">We’ve saved your booking details and sent the confirmation to your contact information.</p>
          </div>

          <div className="mt-8 grid gap-4 rounded-2xl border border-gray-200/80 bg-gradient-to-br from-purple-50 to-blue-50 p-5 dark:border-gray-800 dark:from-purple-900/20 dark:to-blue-900/20 md:grid-cols-2">
            <div className="rounded-2xl bg-white/70 p-4 shadow-sm dark:bg-gray-900/70">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Reservation ID</p>
              <p className="mt-2 font-black text-gray-900 dark:text-white">{reservation?.id || 'RSV-0001'}</p>
            </div>
            <div className="rounded-2xl bg-white/70 p-4 shadow-sm dark:bg-gray-900/70">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Table</p>
              <p className="mt-2 font-black text-gray-900 dark:text-white">{reservation?.table?.number ? `Table ${reservation.table.number}` : 'Reserved'}</p>
            </div>
            <div className="rounded-2xl bg-white/70 p-4 shadow-sm dark:bg-gray-900/70">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <CalendarDays className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">{reservation?.date || 'Today'}</span>
              </div>
            </div>
            <div className="rounded-2xl bg-white/70 p-4 shadow-sm dark:bg-gray-900/70">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Clock3 className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">{reservation?.time || 'Scheduled'}</span>
              </div>
            </div>
            <div className="rounded-2xl bg-white/70 p-4 shadow-sm dark:bg-gray-900/70 md:col-span-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Users className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">{reservation?.guests || 2} guests • {reservation?.name || 'Guest'}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/reservations/my" className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-3 font-semibold text-white shadow-lg transition hover:from-purple-600 hover:to-blue-600">
              View My Reservations <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/" className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">
              <Home className="h-4 w-4" /> Back Home
            </Link>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
