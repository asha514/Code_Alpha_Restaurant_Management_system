import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, ChevronRight, CalendarCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import useTables from '../../hooks/useTables';

const tableStatusConfig = {
  available: { label: 'Available', bg: 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700', dot: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-400' },
  occupied: { label: 'Occupied', bg: 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700', dot: 'bg-red-500', text: 'text-red-700 dark:text-red-400' },
  reserved: { label: 'Reserved', bg: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700', dot: 'bg-yellow-500', text: 'text-yellow-700 dark:text-yellow-400' },
  cleaning: { label: 'Cleaning', bg: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700', dot: 'bg-blue-500', text: 'text-blue-700 dark:text-blue-400' },
};

export default function Reservations() {
  const [selectedTableId, setSelectedTableId] = useState(null);
  const { tables: TABLES = [] } = useTables();
  const selectedTable = TABLES.find(t => t.id === selectedTableId) || null;
  const stats = {
    available: (TABLES.filter?.(t => t.status === 'available') || []).length,
    occupied: (TABLES.filter?.(t => t.status === 'occupied') || []).length,
    reserved: (TABLES.filter?.(t => t.status === 'reserved') || []).length,
    cleaning: (TABLES.filter?.(t => t.status === 'cleaning') || []).length,
  };

  const hasCoordinateLayout = TABLES.every((table) => {
    const x = Number(table.x);
    const y = Number(table.y);
    return Number.isFinite(x) && Number.isFinite(y);
  });

  const renderTableCard = (table) => {
    const cfg = tableStatusConfig[table.status] || tableStatusConfig.available;
    const isSelected = selectedTableId === table.id;
    const isAvail = table.status === 'available';

    return (
      <motion.button
        key={table.id}
        whileHover={{ y: -3, scale: isAvail ? 1.02 : 1 }}
        whileTap={{ scale: isAvail ? 0.97 : 1 }}
        onClick={() => isAvail && setSelectedTableId(isSelected ? null : table.id)}
        className={`flex min-h-[92px] flex-col items-center justify-center rounded-2xl border-2 p-3 text-center shadow-sm transition-all ${cfg.bg} ${isSelected ? 'ring-4 ring-purple-500 ring-offset-2 shadow-lg' : 'hover:shadow-lg'} ${!isAvail ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
        title={`Table ${table.number} (${table.capacity} seats) - ${table.status}`}
      >
        <div className={`mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 text-base font-black text-gray-900 shadow-sm dark:bg-gray-950/70 dark:text-white`}>
          {table.number}
        </div>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">Table {table.number}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{table.capacity} seats</p>
        <span className={`mt-2 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${cfg.text} bg-white/70 dark:bg-gray-950/70`}>
          {cfg.label}
        </span>
      </motion.button>
    );
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="container-custom text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-purple-200 text-sm font-medium uppercase tracking-widest">Table Booking</span>
            <h1 className="text-5xl font-black mt-2 mb-3">Reserve Your Table</h1>
            <p className="text-purple-100 max-w-lg mx-auto">View our restaurant layout and book your preferred table instantly.</p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Link to="/reservations/book" className="px-8 py-3.5 bg-white text-purple-600 font-bold rounded-2xl hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl">
                Book a Table
              </Link>
              <Link to="/reservations/my" className="px-8 py-3.5 bg-white/10 border border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-all backdrop-blur-sm">
                My Reservations
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(stats).map(([key, val]) => {
            const cfg = tableStatusConfig[key];
            return (
              <div key={key} className={`${cfg.bg} border rounded-2xl p-4 text-center`}>
                <div className={`text-3xl font-black ${cfg.text}`}>{val}</div>
                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                  <span className={`text-sm font-medium ${cfg.text}`}>{cfg.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-6 text-sm">
          {Object.entries(tableStatusConfig).map(([key, cfg]) => (
            <span key={key} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-sm ${cfg.dot}`} />
              <span className="text-gray-600 dark:text-gray-400 capitalize">{cfg.label}</span>
            </span>
          ))}
        </div>

        {/* Restaurant floor plan */}
        <div className="mb-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-card dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white">Restaurant Floor Plan</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {hasCoordinateLayout ? 'Tables are positioned using saved coordinates.' : 'Tables are arranged in a responsive grid because coordinates are not available.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Window Section', 'Center Section', 'Garden View', 'Private / Bar'].map((section) => (
                <span key={section} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-400">
                  {section}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-4 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900 sm:p-6">
            {hasCoordinateLayout ? (
              <div className="relative min-h-[28rem] overflow-hidden rounded-2xl border border-gray-200/70 bg-[radial-gradient(circle_at_top_left,_rgba(147,197,253,0.2),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(192,132,252,0.2),_transparent_30%)] p-4 sm:min-h-[34rem]">
                {TABLES.map((table) => {
                  const cfg = tableStatusConfig[table.status] || tableStatusConfig.available;
                  const isSelected = selectedTableId === table.id;
                  const isAvail = table.status === 'available';

                  return (
                    <motion.button
                      key={table.id}
                      whileHover={{ y: -3, scale: isAvail ? 1.03 : 1 }}
                      whileTap={{ scale: isAvail ? 0.97 : 1 }}
                      onClick={() => isAvail && setSelectedTableId(isSelected ? null : table.id)}
                      className={`absolute flex flex-col items-center justify-center rounded-2xl border-2 p-2 text-center shadow-sm transition-all ${table.capacity >= 8 ? 'min-h-[86px] min-w-[86px]' : table.capacity >= 6 ? 'min-h-[78px] min-w-[78px]' : table.capacity >= 4 ? 'min-h-[72px] min-w-[72px]' : 'min-h-[68px] min-w-[68px]'} ${cfg.bg} ${isSelected ? 'ring-4 ring-purple-500 ring-offset-2 shadow-lg' : 'hover:shadow-lg'} ${!isAvail ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
                      style={{ left: `${Number(table.x)}%`, top: `${Number(table.y)}%` }}
                      title={`Table ${table.number} (${table.capacity} seats) - ${table.status}`}
                    >
                      <span className={`text-sm font-black ${cfg.text}`}>T{table.number}</span>
                      <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">{table.capacity}p</span>
                      <span className={`mt-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${cfg.text}`}>{cfg.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {TABLES.map((table) => renderTableCard(table))}
              </div>
            )}
          </div>

          {/* Selected table info */}
          {selectedTable && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center justify-between bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center font-black text-lg">{selectedTable.number}</div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Table {selectedTable.number}</p>
                  <p className="text-sm text-gray-500">{selectedTable.capacity} seats • {selectedTable.section} Section</p>
                </div>
              </div>
              <Link to={`/reservations/book?table=${selectedTable.id}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all shadow-md">
                Book This Table <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </div>

        {/* Table grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {TABLES.map((table) => renderTableCard(table))}
        </div>
      </div>
    </MainLayout>
  );
}
