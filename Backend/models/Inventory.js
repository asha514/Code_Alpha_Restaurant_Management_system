import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  unit: String,
  stock: { type: Number, default: 0 },
  minStock: Number,
  maxStock: Number,
  price: Number,
  supplier: String,
  status: { type: String, enum: ['normal','low','out'], default: 'normal' }
}, { timestamps: true });

export default mongoose.model('Inventory', inventorySchema);
