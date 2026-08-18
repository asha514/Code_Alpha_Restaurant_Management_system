import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  price: { type: Number, required: true },
  originalPrice: Number,
  image: String,
  isVeg: Boolean,
  isAvailable: { type: Boolean, default: true },
  tags: [String],
  prepTime: String,
  calories: Number,
  ingredients: [String]
}, { timestamps: true });

export default mongoose.model('MenuItem', menuItemSchema);
