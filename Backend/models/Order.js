import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
  name: String,
  price: Number,
  quantity: { type: Number, default: 1 }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [orderItemSchema],
  subtotal: Number,
  gst: Number,
  discount: Number,
  deliveryCharge: { type: Number, default: 0 },
  total: Number,
  status: { type: String, enum: ['pending','preparing','ready','served','completed','cancelled'], default: 'pending' },
  table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
  address: String,
  paymentMethod: String
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
