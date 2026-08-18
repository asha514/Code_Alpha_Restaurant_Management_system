import Table from '../models/Table.js';

export const list = async (req, res) => { try { const t = await Table.find(); res.json(t); } catch (err) { res.status(500).json({ message: err.message }); } };
export const get = async (req, res) => { try { const t = await Table.findById(req.params.id); if (!t) return res.status(404).json({ message: 'Not found' }); res.json(t); } catch (err) { res.status(500).json({ message: err.message }); } };
export const create = async (req, res) => { try { const t = await Table.create(req.body); res.status(201).json(t); } catch (err) { res.status(500).json({ message: err.message }); } };
export const update = async (req, res) => { try { const t = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(t); } catch (err) { res.status(500).json({ message: err.message }); } };
export const remove = async (req, res) => { try { await Table.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (err) { res.status(500).json({ message: err.message }); } };
