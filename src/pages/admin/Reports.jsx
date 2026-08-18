import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Printer } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { PageHeader, Button } from '../../components/ui/index';
import toast from 'react-hot-toast';

export default function Reports() {
  const reports = [
    { title: 'Daily Sales Report', desc: 'Detailed breakdown of today’s orders, revenue, and payment methods.', date: 'Today' },
    { title: 'Weekly Performance Report', desc: 'Summary of weekly revenue, peak ordering hours, and customer trends.', date: 'Dec 10 – Dec 17' },
    { title: 'Monthly Financial Summary', desc: 'Complete monthly profit & loss breakdown with tax deduction summaries.', date: 'November 2024' },
    { title: 'Inventory Consumption Report', desc: 'Raw material usage stats, wasted inventory log, and reorder alerts.', date: 'Dec 2024' },
  ];

  return (
    <AdminLayout>
      <PageHeader title="Financial & Sales Reports" subtitle="Generate and export detailed business reports" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((rep, i) => (
          <motion.div
            key={rep.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-gray-900 rounded-3xl p-6 border border-gray-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{rep.title}</h3>
                  <p className="text-xs text-gray-400">{rep.date}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">{rep.desc}</p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                onClick={() => toast.success(`Downloading ${rep.title} (PDF)...`)}
                icon={<Download className="w-4 h-4" />}
              >
                Export PDF
              </Button>
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                onClick={() => toast.success(`Printing ${rep.title}...`)}
                icon={<Printer className="w-4 h-4" />}
              >
                Print
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </AdminLayout>
  );
}
