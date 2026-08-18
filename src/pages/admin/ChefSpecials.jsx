import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { PageHeader, Modal, Button } from '../../components/ui/index';
import { chefSpecials as specialsApi } from '../../services/api';
import useChefSpecials from '../../hooks/useChefSpecials';
import toast from 'react-hot-toast';

const defaultForm = {
  name: '',
  description: '',
  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop',
  price: '',
  category: "Chef's Special",
  availableDate: '',
  isAvailable: true,
};

export default function ChefSpecials() {
  const { specials: initialSpecials = [], loading } = useChefSpecials();
  const [specials, setSpecials] = useState(initialSpecials);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => { setSpecials(initialSpecials); }, [initialSpecials]);

  const filtered = specials.filter(item => String(item.name || '').toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => {
    setEditing(null);
    setForm(defaultForm);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      name: item.name,
      description: item.description,
      image: item.image,
      price: item.price,
      category: item.category || "Chef's Special",
      availableDate: item.availableDate ? item.availableDate.slice(0, 10) : '',
      isAvailable: item.isAvailable,
    });
    setModalOpen(true);
  };

  const refreshSpecials = async () => {
    try {
      const data = await specialsApi.list();
      setSpecials(Array.isArray(data) ? data.map(s => ({ ...s, id: String(s.id ?? s._id ?? '') })) : []);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Unable to refresh chef specials');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        availableDate: new Date(form.availableDate),
        isAvailable: form.isAvailable,
      };
      if (editing) {
        await specialsApi.update(editing.id, payload);
        toast.success('Chef special updated successfully');
      } else {
        await specialsApi.create(payload);
        toast.success('Chef special created successfully');
      }
      setModalOpen(false);
      setEditing(null);
      await refreshSpecials();
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Unable to save chef special');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this chef special?')) return;
    try {
      await specialsApi.remove(id);
      toast.success('Chef special deleted');
      setSpecials(specials.filter(item => item.id !== id));
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Unable to delete chef special');
    }
  };

  return (
    <AdminLayout>
      <PageHeader title="Chef Specials" subtitle="Manage today’s chef recommendations">
        <Button onClick={openAdd} icon={<Plus className="w-4 h-4" />}>
          Add Special
        </Button>
      </PageHeader>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search specials..."
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-white text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-gray-800/60 text-gray-300 uppercase text-xs">
              <tr>
                <th className="p-4">Special</th>
                <th className="p-4">Available Date</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr><td colSpan="5" className="p-6 text-center text-gray-500">Loading specials...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="5" className="p-6 text-center text-gray-500">No specials found.</td></tr>
              ) : filtered.map(item => (
                <tr key={item.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white">{item.name}</div>
                    <div className="text-gray-500 text-xs line-clamp-2">{item.description}</div>
                  </td>
                  <td className="p-4">{new Date(item.availableDate).toLocaleDateString()}</td>
                  <td className="p-4 font-bold text-orange-400">₹{item.price}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.isAvailable ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
                      {item.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button onClick={() => openEdit(item)} className="p-2 rounded-xl bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 rounded-xl bg-gray-800 text-red-400 hover:text-red-300 hover:bg-gray-700 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Chef Special' : 'Create Chef Special'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Name</label>
              <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-base" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Category</label>
              <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input-base" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Price</label>
              <input required type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="input-base" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Available Date</label>
              <input required type="date" value={form.availableDate} onChange={e => setForm({ ...form, availableDate: e.target.value })} className="input-base" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-400 mb-1">Image URL</label>
              <input required value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="input-base" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Description</label>
            <textarea required rows="4" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input-base resize-none" />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input type="checkbox" checked={form.isAvailable} onChange={e => setForm({ ...form, isAvailable: e.target.checked })} className="accent-orange-500" />
              Available
            </label>
          </div>
          {error && <div className="text-sm text-red-400">{error}</div>}
          <Button type="submit" fullWidth loading={saving}>
            {editing ? 'Update Special' : 'Save Special'}
          </Button>
        </form>
      </Modal>
    </AdminLayout>
  );
}
