import Reservation from '../models/Reservation.js';
import Table from '../models/Table.js';

// Check availability and prevent duplicates
export const create = async (req, res) => {
  try {
    const { date, time, guests, tableId, name, phone, email } = req.body;
    // prevent duplicate reservation for same phone/date/time
    const dup = await Reservation.findOne({ phone, date, time });
    if (dup) return res.status(400).json({ message: 'Duplicate reservation' });

    const table = await Table.findById(tableId);
    if (!table) return res.status(400).json({ message: 'Table not found' });
    if (table.status !== 'available') return res.status(400).json({ message: 'Table not available' });

    const reservation = await Reservation.create({ name, user: req.user.id, phone, email, date, time, guests, table: tableId, status: 'confirmed' });
    await Table.findByIdAndUpdate(tableId, { status: 'reserved' });
    res.status(201).json(reservation);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const list = async (req, res) => {
  try { const items = await Reservation.find().populate('table').populate('user'); res.json(items); } catch (err) { res.status(500).json({ message: err.message }); }
};

export const get = async (req, res) => { try { const r = await Reservation.findById(req.params.id).populate('table').populate('user'); if (!r) return res.status(404).json({ message: 'Not found' }); res.json(r); } catch (err) { res.status(500).json({ message: err.message }); } };

export const update = async (req, res) => { try { const r = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(r); } catch (err) { res.status(500).json({ message: err.message }); } };

export const remove = async (req, res) => { try { const r = await Reservation.findById(req.params.id); if (!r) return res.status(404).json({ message: 'Not found' }); await r.remove(); if (r.table) await Table.findByIdAndUpdate(r.table, { status: 'available' }); res.json({ message: 'Deleted' }); } catch (err) { res.status(500).json({ message: err.message }); } };
