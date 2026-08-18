import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  phone: String,
  email: String,
  date: { type: String },
  time: { type: String },
  guests: Number,
  table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
  status: { type: String, enum: ['pending','confirmed','cancelled'], default: 'pending' },
  notes: String,
  occasion: String
}, { timestamps: true });

export default mongoose.model('Reservation', reservationSchema);
