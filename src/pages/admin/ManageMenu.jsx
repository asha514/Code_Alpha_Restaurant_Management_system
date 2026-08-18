import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Eye, ToggleLeft, ToggleRight, Grid, List } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import useMenuItems from '../../hooks/useMenuItems';
import { PageHeader, Modal, Button } from '../../components/ui/index';
import toast from 'react-hot-toast';

export default function ManageMenu() {
  const { items: MENU_ITEMS = [], loading } = useMenuItems();
  const [items, setItems] = useState(MENU_ITEMS);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [view, setView] = useState('table');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [form, setForm] = useState({
    name: '', category: 'Starters', price: '', description: '', isVeg: true, isAvailable: true, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop'
  });

  // sync with API-loaded menu items
  useEffect(() => { setItems(MENU_ITEMS); }, [MENU_ITEMS]);

  const filtered = items.filter(item => {
    const matchesSearch = String(item?.name || '').toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || String(item?.category || '') === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const CATEGORIES = [{ id: 1, name: 'All' }, ...Array.from(new Set(MENU_ITEMS.map(i => String(i?.category || '')))).filter(c => c).map((c, idx) => ({ id: 10 + idx, name: c }))];

  const handleToggleStatus = (id) => {
    setItems(items.map(i => i.id === id ? { ...i, isAvailable: !i.isAvailable } : i));
    toast.success('Status updated');
  };

  const handleDelete = (id) => {
    setItems(items.filter(i => i.id !== id));
    toast.success('Menu item deleted');
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingItem) {
      setItems(items.map(i => i.id === editingItem.id ? { ...i, ...form, price: Number(form.price) } : i));
      toast.success('Menu item updated');
    } else {
      const newItem = {
        id: Date.now(),
        ...form,
        price: Number(form.price),
        rating: 4.8,
        reviews: 0,
        tags: ['New'],
        prepTime: '20 mins',
        calories: 350,
      };
      setItems([newItem, ...items]);
      toast.success('New menu item added!');
    }
    setIsAddModalOpen(false);
    setEditingItem(null);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      name: String(item?.name || ''),
      category: String(item?.category || 'Starters'),
      price: Number(item?.price ?? ''),
      description: String(item?.description || ''),
      isVeg: Boolean(item?.isVeg),
      isAvailable: Boolean(item?.isAvailable),
      image: String(item?.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop')
    });
    setIsAddModalOpen(true);
  };

  return (
    <AdminLayout>
      <PageHeader title="Manage Menu" subtitle={`Total ${items.length} menu items available`}>
        <Button onClick={() => { setEditingItem(null); setForm({ name: '', category: 'Starters', price: '', description: '', isVeg: true, isAvailable: true, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop' }); setIsAddModalOpen(true); }} icon={<Plus className="w-4 h-4" />}>
          Add Menu Item
        </Button>
      </PageHeader>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-gray-900 p-4 rounded-2xl border border-gray-800">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-3 py-2 focus:outline-none"
          >
            {CATEGORIES.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
          </select>

          <div className="flex bg-gray-800 rounded-xl p-1 border border-gray-700">
            <button onClick={() => setView('table')} className={`p-1.5 rounded-lg ${view === 'table' ? 'bg-gray-700 text-orange-400' : 'text-gray-400'}`}>
              <List className="w-4 h-4" />
            </button>
            <button onClick={() => setView('grid')} className={`p-1.5 rounded-lg ${view === 'grid' ? 'bg-gray-700 text-orange-400' : 'text-gray-400'}`}>
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {view === 'table' ? (
        <div className="bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="bg-gray-800/60 text-gray-300 uppercase text-xs">
                <tr>
                  <th className="p-4">Item</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filtered.map(item => (
                  <tr key={item.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold text-white text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{item.category}</td>
                    <td className="p-4 font-bold text-orange-400">₹{item.price}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${item.isVeg ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {item.isVeg ? 'Veg' : 'Non-Veg'}
                      </span>
                    </td>
                    <td className="p-4">
                      <button onClick={() => handleToggleStatus(item.id)} className="flex items-center gap-1 text-xs">
                        {item.isAvailable ? (
                          <span className="text-emerald-400 flex items-center gap-1 font-bold"><ToggleRight className="w-5 h-5" /> Available</span>
                        ) : (
                          <span className="text-red-400 flex items-center gap-1 font-bold"><ToggleLeft className="w-5 h-5" /> Sold Out</span>
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(item)} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400 hover:text-red-300 rounded-lg hover:bg-gray-800">
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(item => (
            <div key={item.id} className="bg-gray-900 rounded-3xl p-4 border border-gray-800 flex flex-col justify-between">
              <div>
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-2xl mb-3" />
                <h3 className="font-bold text-white text-base mb-1">{item.name}</h3>
                <p className="text-xs text-gray-400 line-clamp-2 mb-3">{item.description}</p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                <span className="font-black text-orange-400">₹{item.price}</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(item)} className="p-2 text-gray-400 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={editingItem ? 'Edit Item' : 'Add New Item'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Item Name</label>
            <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-base" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input-base">
                {CATEGORIES.filter(c => c.name !== 'All').map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Price (₹)</label>
              <input required type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="input-base" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Description</label>
            <textarea required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input-base resize-none" />
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input type="checkbox" checked={form.isVeg} onChange={e => setForm({ ...form, isVeg: e.target.checked })} className="accent-orange-500" />
              Vegetarian
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input type="checkbox" checked={form.isAvailable} onChange={e => setForm({ ...form, isAvailable: e.target.checked })} className="accent-orange-500" />
              Available
            </label>
          </div>
          <Button type="submit" fullWidth className="mt-4">
            {editingItem ? 'Update Item' : 'Add Item'}
          </Button>
        </form>
      </Modal>
    </AdminLayout>
  );
}
