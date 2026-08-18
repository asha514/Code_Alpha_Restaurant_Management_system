import ChefSpecial from '../models/ChefSpecial.js';

export const list = async (req, res) => {
  try {
    const specials = await ChefSpecial.find().sort({ availableDate: -1 });
    res.json(specials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const today = async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const specials = await ChefSpecial.find({
      isAvailable: true,
      availableDate: { $gte: startOfDay, $lt: endOfDay },
    }).sort({ createdAt: -1 });
    res.json(specials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const get = async (req, res) => {
  try {
    const special = await ChefSpecial.findById(req.params.id);
    if (!special) return res.status(404).json({ message: 'Chef special not found' });
    res.json(special);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const { name, description, image, price, category, availableDate, isAvailable } = req.body;
    if (!name || !description || !image || price === undefined || !availableDate) {
      return res.status(400).json({ message: 'Missing required chef special fields' });
    }

    const special = await ChefSpecial.create({
      name,
      description,
      image,
      price,
      category: category || "Chef's Special",
      availableDate,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
    });
    res.status(201).json(special);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const special = await ChefSpecial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      context: 'query',
    });
    if (!special) return res.status(404).json({ message: 'Chef special not found' });
    res.json(special);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const special = await ChefSpecial.findByIdAndDelete(req.params.id);
    if (!special) return res.status(404).json({ message: 'Chef special not found' });
    res.json({ message: 'Chef special deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
