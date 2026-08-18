import mongoose from 'mongoose';

const chefSpecialSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, trim: true, default: "Chef's Special" },
  availableDate: { type: Date, required: true },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('ChefSpecial', chefSpecialSchema);
