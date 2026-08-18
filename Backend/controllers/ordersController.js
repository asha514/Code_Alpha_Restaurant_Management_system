import Order from '../models/Order.js';
import Inventory from '../models/Inventory.js';
import Table from '../models/Table.js';

// helper: calculate totals
function calculateTotals(items, deliveryCharge=0, discount=0) {
  let subtotal = 0;
  items.forEach(i => { subtotal += (i.price || 0) * (i.quantity || 1); });
  const gst = Math.round(subtotal * 0.12);
  const total = subtotal + gst + deliveryCharge - (discount || 0);
  return { subtotal, gst, total };
}

export const list = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.menuItem').populate('user').populate('table');
    res.json(orders);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const get = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.menuItem').populate('user').populate('table');
    if (!order) return res.status(404).json({ message: 'Not found' });
    res.json(order);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const create = async (req, res) => {
  try {
    const { items, deliveryCharge, discount, tableId } = req.body;
    const { subtotal, gst, total } = calculateTotals(items, deliveryCharge, discount);

    // reduce inventory (simple implementation: expects items contain ingredient references)
    // TODO: map menuItem -> inventory usage

    const order = await Order.create({ user: req.user.id, items, subtotal, gst, discount, deliveryCharge, total, table: tableId });

    // update table status
    if (tableId) await Table.findByIdAndUpdate(tableId, { status: 'occupied' });

    res.status(201).json(order);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const update = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(order);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const remove = async (req, res) => {
  try {
    const ord = await Order.findById(req.params.id);
    if (!ord) return res.status(404).json({ message: 'Not found' });
    await ord.remove();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
