import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0, min: 0, max: 100 },
  code: { type: String, trim: true, unique: true, sparse: true },
  minOrder: { type: Number, min: 0 },
  icon: { type: String, trim: true, default: '🎉' },
  gradient: { type: String, trim: true, default: 'from-orange-500 to-red-500' },
  validFrom: { type: Date, required: true },
  validUntil: {
    type: Date,
    required: true,
    validate: {
      validator(value) {
        return !this.validFrom || value >= this.validFrom;
      },
      message: 'validUntil must be the same day or after validFrom',
    },
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Offer', offerSchema);
