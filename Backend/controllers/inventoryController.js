import Inventory from '../models/Inventory.js';

export const list = async (req, res) => { try { const a = await Inventory.find(); res.json(a); } catch (err) { res.status(500).json({ message: err.message }); } };
export const get = async (req, res) => { try { const a = await Inventory.findById(req.params.id); if (!a) return res.status(404).json({ message: 'Not found' }); res.json(a); } catch (err) { res.status(500).json({ message: err.message }); } };
export const create = async (req, res) => { try { const a = await Inventory.create(req.body); res.status(201).json(a); } catch (err) { res.status(500).json({ message: err.message }); } };
export const update = async (req, res) => { try { const a = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(a); } catch (err) { res.status(500).json({ message: err.message }); } };
export const remove = async (req, res) => { try { await Inventory.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (err) { res.status(500).json({ message: err.message }); } };
