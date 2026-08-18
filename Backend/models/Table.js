import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  capacity: { type: Number, default: 2 },
  status: { type: String, enum: ['available','occupied','reserved','cleaning'], default: 'available' },
  section: String
}, { timestamps: true });

export default mongoose.model('Table', tableSchema);
