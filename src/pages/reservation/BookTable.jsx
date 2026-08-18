import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, Users, MessageSquare, Check, Sparkles, LoaderCircle, AlertTriangle, BadgeCheck } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import useTables from '../../hooks/useTables';
import useReservations from '../../hooks/useReservations';
import toast from 'react-hot-toast';
import { reservations as reservationApi } from '../../services/api';

const TIME_SLOTS = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'];
const OCCASIONS = ['None', 'Birthday', 'Anniversary', 'Business Dinner', 'Date Night', 'Family Gathering', 'Other'];

export default function BookTable() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [selectedTable, setSelectedTable] = useState(searchParams.get('table') || '');
  const [loading, setLoading] = useState(false);
  const [reservationError, setReservationError] = useState('');
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: 'Arjun Sharma',
      phone: '+91 98765 43210',
      email: 'arjun@example.com',
      occasion: 'None',
      notes: ''
    }
  });

  const date = watch('date') || '';
  const { tables: TABLES = [], loading: tablesLoading } = useTables();
  const { reservations = [], loading: reservationsLoading, error: reservationsError } = useReservations();

  useEffect(() => {
    if (searchParams.get('table')) {
      setSelectedTable(searchParams.get('table'));
    }
  }, [searchParams]);

  const blockedTableIds = useMemo(() => {
    if (!date || !selectedTime) return new Set();
    return new Set(
      (reservations || [])
        .filter((reservation) => String(reservation.date) === String(date) && String(reservation.time) === String(selectedTime) && String(reservation.status || '').toLowerCase() !== 'cancelled')
        .map((reservation) => String(reservation.table?._id || reservation.table || reservation.tableId || ''))
    );
  }, [date, selectedTime, reservations]);

  useEffect(() => {
    if (selectedTable && blockedTableIds.has(String(selectedTable))) {
      setSelectedTable('');
    }
  }, [blockedTableIds, selectedTable]);

  const availableTables = useMemo(() => {
    if (!Array.isArray(TABLES)) return [];
    return TABLES.filter((table) => {
      const tableKey = String(table.id ?? table._id ?? '');
      return table.capacity >= selectedGuests && table.status === 'available' && !blockedTableIds.has(tableKey);
    });
  }, [TABLES, selectedGuests, blockedTableIds]);

  const onSubmit = async (data) => {
    if (!selectedTime) {
      toast.error('Please select a time slot');
      return;
    }
    if (!selectedTable) {
      toast.error('Please select a table');
      return;
    }
    if (!date) {
      toast.error('Please choose a date');
      return;
    }

    setLoading(true);
    setReservationError('');

    try {
      const payload = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        date,
        time: selectedTime,
        guests: selectedGuests,
        tableId: selectedTable,
        notes: data.notes,
        occasion: data.occasion || 'None',
      };

      const reservation = await reservationApi.create(payload);
      toast.success('Reservation confirmed! 🎉');
      reset();
      navigate('/reservations/success', { state: { reservation } });
    } catch (err) {
      const message = err?.response?.data?.message || 'Unable to create reservation right now.';
      setReservationError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container-custom py-10">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-purple-600 dark:border-purple-900/40 dark:bg-purple-900/20 dark:text-purple-300">
                <Sparkles className="h-4 w-4" /> Book a Table
              </span>
              <h1 className="mt-4 text-4xl font-black text-gray-900 dark:text-white">Reserve Your Experience</h1>
              <p className="mx-auto mt-3 max-w-2xl text-gray-500 dark:text-gray-400">Choose your preferred date, time, and table with a premium booking experience designed for effortless dining.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {reservationError && (
                <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300">
                  <AlertTriangle className="h-4 w-4" />
                  {reservationError}
                </div>
              )}

              {/* Date & Guest Count */}
              <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-800 backdrop-blur-xl">
                <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-5 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-500" /> Date & Guests
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Date</label>
                    <input {...register('date', { required: 'Date is required' })} type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className={`input-base ${errors.date ? 'border-red-400' : ''}`}
                    />
                    {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Occasion</label>
                    <select {...register('occasion')} className="input-base">
                      {OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                {/* Guest count */}
                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Users className="w-4 h-4" /> Number of Guests
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10].map(n => (
                      <button type="button" key={n} onClick={() => { setSelectedGuests(n); setSelectedTable(''); }}
                        className={`w-12 h-12 rounded-xl font-bold text-sm transition-all ${selectedGuests === n ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'}`}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Time slot */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-800">
                <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-5 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-500" /> Time Slot
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {TIME_SLOTS.map(time => (
                    <button type="button" key={time} onClick={() => setSelectedTime(time)}
                      className={`py-2.5 rounded-xl text-sm font-medium transition-all ${selectedTime === time ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table selection */}
              {selectedGuests && (
                <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-800 backdrop-blur-xl">
                  <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-2 flex items-center gap-2">
                    🪑 Available Tables
                  </h2>
                  <p className="text-sm text-gray-400 mb-4">{availableTables.length} tables available for {selectedGuests} guest{selectedGuests > 1 ? 's' : ''}</p>
                  {tablesLoading || reservationsLoading ? (
                    <div className="flex items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 py-8 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400">
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> Loading tables...
                    </div>
                  ) : reservationsError ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300">{reservationsError}</div>
                  ) : availableTables.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 py-8 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400">
                      <div className="mb-2 text-4xl">😔</div>
                      <p>No tables are currently available for this group size on the selected date and time.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {availableTables.map(table => (
                        <motion.button whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }} type="button" key={table.id} onClick={() => setSelectedTable(table.id)}
                          className={`p-4 rounded-2xl border-2 text-center transition-all ${selectedTable === table.id ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'}`}>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black mx-auto mb-2 ${selectedTable === table.id ? 'bg-gradient-to-br from-purple-500 to-blue-500' : 'bg-emerald-500'}`}>
                            {table.number}
                          </div>
                          <p className={`text-xs font-bold ${selectedTable === table.id ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300'}`}>Table {table.number}</p>
                          <p className="text-xs text-gray-400">{table.capacity} seats</p>
                          <p className="text-xs text-gray-400">{table.section}</p>
                          {selectedTable === table.id && <Check className="w-4 h-4 text-purple-500 mx-auto mt-1" />}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Contact & Notes */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-800">
                <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-5 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-500" /> Contact & Notes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Full Name</label>
                    <input {...register('name', { required: 'Name required' })} defaultValue="Arjun Sharma" className="input-base" />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Phone</label>
                    <input {...register('phone', { required: 'Phone required' })} defaultValue="+91 98765 43210" className="input-base" />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Email</label>
                  <input {...register('email', { required: 'Email required' })} defaultValue="arjun@example.com" className="input-base" />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                </div>
                <div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Special Requests (optional)</label>
                  <textarea {...register('notes')} rows={3} placeholder="Birthday cake, wheelchair access, window seat preference..."
                    className="input-base resize-none" />
                </div>
              </div>

              {/* Summary & Submit */}
              {selectedTime && selectedTable && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-5">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">Reservation Summary</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    {[
                      ['📅', 'Date', date || 'Not selected'],
                      ['🕐', 'Time', selectedTime],
                      ['👥', 'Guests', `${selectedGuests} people`],
                      ['🪑', 'Table', `Table ${TABLES.find(t => t.id === selectedTable)?.number} (${TABLES.find(t => t.id === selectedTable)?.section})`],
                    ].map(([icon, label, val]) => (
                      <div key={label}>
                        <p className="text-gray-400 text-xs">{icon} {label}</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{val}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              <button type="submit" disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-purple-500/30 disabled:opacity-70 flex items-center justify-center gap-2 text-lg">
                {loading ? <><LoaderCircle className="h-5 w-5 animate-spin" />Creating reservation...</> : <><BadgeCheck className="h-5 w-5" /> Confirm Reservation</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
