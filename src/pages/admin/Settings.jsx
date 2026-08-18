import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Save, Store, Globe, DollarSign, Bell } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import useSiteMeta from '../../hooks/useSiteMeta';
import { PageHeader, Button } from '../../components/ui/index';
import toast from 'react-hot-toast';

export default function Settings() {
  const { meta = {} } = useSiteMeta();
  const [info, setInfo] = useState({
    name: meta.name || '',
    email: meta.email || '',
    phone: meta.phone || '',
    address: meta.address || '',
    currency: 'INR (₹)',
    language: 'English (US)',
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Restaurant settings saved successfully!');
  };

  return (
    <AdminLayout>
      <PageHeader title="Restaurant Settings" subtitle="Configure business profile, notifications, and operational preferences" />

      <div className="max-w-3xl bg-gray-900 rounded-3xl p-6 border border-gray-800">
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Store className="w-5 h-5 text-orange-500" /> General Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Restaurant Name</label>
                <input
                  type="text"
                  value={info.name}
                  onChange={e => setInfo({ ...info, name: e.target.value })}
                  className="input-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={info.email}
                  onChange={e => setInfo({ ...info, email: e.target.value })}
                  className="input-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={info.phone}
                  onChange={e => setInfo({ ...info, phone: e.target.value })}
                  className="input-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Currency</label>
                <select
                  value={info.currency}
                  onChange={e => setInfo({ ...info, currency: e.target.value })}
                  className="input-base"
                >
                  <option value="INR (₹)">INR (₹)</option>
                  <option value="USD ($)">USD ($)</option>
                  <option value="EUR (€)">EUR (€)</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-400 mb-1">Address</label>
                <input
                  type="text"
                  value={info.address}
                  onChange={e => setInfo({ ...info, address: e.target.value })}
                  className="input-base"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <Button type="submit" icon={<Save className="w-4 h-4" />}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
