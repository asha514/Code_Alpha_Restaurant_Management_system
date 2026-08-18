import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { PageHeader, Modal, Button } from '../../components/ui/index';
import { offers as offersApi } from '../../services/api';
import useOffers from '../../hooks/useOffers';
import toast from 'react-hot-toast';

const defaultForm = {
  title: '',
  description: '',
  image: 'https://images.unsplash.com/photo-1559628235-92590c842887?w=800&auto=format&fit=crop',
  price: '',
  discount: 0,
  code: '',
  minOrder: 0,
  gradient: 'from-orange-500 to-red-500',
  icon: '🎉',
  validFrom: '',
  validUntil: '',
  isActive: true,
};

export default function AdminOffers() {
  const { offers: initialOffers = [], loading } = useOffers();
  const [offers, setOffers] = useState(initialOffers);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => { setOffers(initialOffers); }, [initialOffers]);

  const filtered = offers.filter(offer => String(offer.title || '').toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => {
    setEditingOffer(null);
    setForm(defaultForm);
    setModalOpen(true);
  };

  const openEdit = (offer) => {
    setEditingOffer(offer);
    setForm({
      title: offer.title,
      description: offer.description,
      image: offer.image,
      price: offer.price,
      discount: offer.discount || 0,
      code: offer.code || '',
      minOrder: offer.minOrder || 0,
      gradient: offer.gradient || 'from-orange-500 to-red-500',
      icon: offer.icon || '🎉',
      validFrom: offer.validFrom ? offer.validFrom.slice(0, 10) : '',
      validUntil: offer.validUntil ? offer.validUntil.slice(0, 10) : '',
      isActive: offer.isActive,
    });
    setModalOpen(true);
  };

  const refreshOffers = async () => {
    try {
      const data = await offersApi.list();
      setOffers(Array.isArray(data) ? data.map(o => ({ ...o, id: String(o.id ?? o._id ?? '') })) : []);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Unable to refresh offers');
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
        discount: Number(form.discount),
        minOrder: Number(form.minOrder),
        validFrom: new Date(form.validFrom),
        validUntil: new Date(form.validUntil),
      };
      if (editingOffer) {
        await offersApi.update(editingOffer.id, payload);
        toast.success('Offer updated successfully');
      } else {
        await offersApi.create(payload);
        toast.success('Offer created successfully');
      }
      setModalOpen(false);
      setEditingOffer(null);
      await refreshOffers();
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Unable to save offer');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this offer?')) return;
    try {
      await offersApi.remove(id);
      toast.success('Offer deleted');
      setOffers(offers.filter(item => item.id !== id));
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Unable to delete offer');
    }
  };

  return (
    <AdminLayout>
      <PageHeader title="Manage Offers" subtitle="Create, edit, and remove promotional offers">
        <Button onClick={openAdd} icon={<Plus className="w-4 h-4" />}>
          Add Offer
        </Button>
      </PageHeader>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search offers..."
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-white text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-gray-800/60 text-gray-300 uppercase text-xs">
              <tr>
                <th className="p-4">Offer</th>
                <th className="p-4">Valid</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr><td colSpan="5" className="p-6 text-center text-gray-500">Loading offers...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="5" className="p-6 text-center text-gray-500">No offers found.</td></tr>
              ) : filtered.map(offer => (
                <tr key={offer.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white">{offer.title}</div>
                    <div className="text-gray-500 text-xs line-clamp-2">{offer.description}</div>
                  </td>
                  <td className="p-4">
                    {new Date(offer.validFrom).toLocaleDateString()} – {new Date(offer.validUntil).toLocaleDateString()}
                  </td>
                  <td className="p-4 font-bold text-orange-400">₹{offer.price}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${offer.isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
                      {offer.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button onClick={() => openEdit(offer)} className="p-2 rounded-xl bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(offer.id)} className="p-2 rounded-xl bg-gray-800 text-red-400 hover:text-red-300 hover:bg-gray-700 transition-colors">
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingOffer ? 'Edit Offer' : 'Create Offer'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Title</label>
              <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input-base" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Code</label>
              <input value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} className="input-base" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Image URL</label>
              <input required value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="input-base" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Gradient</label>
              <input value={form.gradient} onChange={e => setForm({ ...form, gradient: e.target.value })} className="input-base" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Price</label>
              <input required type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="input-base" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Discount %</label>
              <input type="number" value={form.discount} onChange={e => setForm({ ...form, discount: e.target.value })} className="input-base" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Min Order</label>
              <input type="number" value={form.minOrder} onChange={e => setForm({ ...form, minOrder: e.target.value })} className="input-base" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Available</label>
              <select value={form.isActive ? 'true' : 'false'} onChange={e => setForm({ ...form, isActive: e.target.value === 'true' })} className="input-base">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Valid From</label>
              <input required type="date" value={form.validFrom} onChange={e => setForm({ ...form, validFrom: e.target.value })} className="input-base" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Valid Until</label>
              <input required type="date" value={form.validUntil} onChange={e => setForm({ ...form, validUntil: e.target.value })} className="input-base" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Description</label>
            <textarea required rows="4" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input-base resize-none" />
          </div>
          {error && <div className="text-sm text-red-400">{error}</div>}
          <Button type="submit" fullWidth loading={saving}>
            {editingOffer ? 'Update Offer' : 'Save Offer'}
          </Button>
        </form>
      </Modal>
    </AdminLayout>
  );
}
