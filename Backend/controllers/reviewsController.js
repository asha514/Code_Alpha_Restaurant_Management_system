import Review from '../models/Review.js';

export const list = async (req, res) => { try { const r = await Review.find().populate('user').populate('menuItem'); res.json(r); } catch (err) { res.status(500).json({ message: err.message }); } };
export const create = async (req, res) => { try { const body = { ...req.body, user: req.user.id }; const r = await Review.create(body); res.status(201).json(r); } catch (err) { res.status(500).json({ message: err.message }); } };
export const update = async (req, res) => { try { const r = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(r); } catch (err) { res.status(500).json({ message: err.message }); } };
export const remove = async (req, res) => { try { await Review.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (err) { res.status(500).json({ message: err.message }); } };
