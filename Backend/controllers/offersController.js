import Offer from '../models/Offer.js';

export const list = async (req, res) => {
  try {
    const offers = await Offer.find().sort({ validFrom: -1 });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const active = async (req, res) => {
  try {
    const now = new Date();
    const offers = await Offer.find({
      isActive: true,
      validFrom: { $lte: now },
      validUntil: { $gte: now },
    }).sort({ validFrom: -1 });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const get = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    res.json(offer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const { title, description, image, price, discount, code, validFrom, validUntil, isActive } = req.body;
    if (!title || !description || !image || price === undefined || !validFrom || !validUntil) {
      return res.status(400).json({ message: 'Missing required offer fields' });
    }

    const offer = await Offer.create({
      title,
      description,
      image,
      price,
      discount: discount || 0,
      code,
      validFrom,
      validUntil,
      isActive: isActive !== undefined ? isActive : true,
    });
    res.status(201).json(offer);
  } catch (err) {
    const message = err.code === 11000 ? 'Offer code already exists' : err.message;
    res.status(500).json({ message });
  }
};

export const update = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      context: 'query',
    });
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    res.json(offer);
  } catch (err) {
    const message = err.code === 11000 ? 'Offer code already exists' : err.message;
    res.status(500).json({ message });
  }
};

export const remove = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    res.json({ message: 'Offer deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
