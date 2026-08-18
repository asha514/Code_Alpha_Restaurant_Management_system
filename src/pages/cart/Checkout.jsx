import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { MapPin, CreditCard, Clock, ChevronRight, Tag, Check, Bike, Wallet, QrCode } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import { useCart } from '../../context/CartContext';
import { VegIcon } from '../../components/ui/index';

const STEPS = ['Delivery', 'Payment', 'Review'];

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, subtotal, gst, deliveryCharge, couponDiscount, total, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [deliveryTime, setDeliveryTime] = useState('asap');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm({
    defaultValues: { name: 'Arjun Sharma', phone: '+91 98765 43210', address: 'Flat 4B, Sea View Apartments, Bandra West', city: 'Mumbai', pincode: '400050' }
  });

  const placeOrder = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    clearCart();
    navigate('/order-success');
  };

  if ((cart || []).length === 0) {
    navigate('/menu');
    return null;
  }

  const paymentMethods = [
    { id: 'upi', label: 'UPI / QR Code', icon: QrCode, desc: 'Pay via PhonePe, GPay, Paytm' },
    { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
    { id: 'wallet', label: 'Digital Wallet', icon: Wallet, desc: 'Paytm, Amazon Pay, Mobikwik' },
    { id: 'cod', label: 'Cash on Delivery', icon: Bike, desc: 'Pay when your order arrives' },
  ];

  return (
    <MainLayout>
      <div className="container-custom py-8">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`flex items-center gap-2 ${i <= step ? 'text-orange-500' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'}`}>
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`font-semibold text-sm hidden sm:block ${i === step ? 'text-orange-500' : i < step ? 'text-emerald-500' : 'text-gray-400'}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 rounded-full ${i < step ? 'bg-emerald-400' : 'bg-gray-200 dark:bg-gray-800'}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main form */}
          <div className="lg:col-span-2">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-800">
                  <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-orange-500" /> Delivery Address</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Full Name</label>
                      <input {...register('name', { required: true })} className="input-base" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Phone</label>
                      <input {...register('phone', { required: true })} className="input-base" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Pincode</label>
                      <input {...register('pincode', { required: true })} className="input-base" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Address</label>
                      <input {...register('address', { required: true })} className="input-base" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">City</label>
                      <input {...register('city', { required: true })} className="input-base" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Delivery Instructions (optional)</label>
                      <input placeholder="Ring the bell, leave at door..." className="input-base" />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-800">
                  <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-orange-500" /> Delivery Time</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[{ val: 'asap', label: 'ASAP', desc: '~35 min' }, { val: '1hr', label: '1 Hour', desc: 'Scheduled' }, { val: '2hr', label: '2 Hours', desc: 'Scheduled' }, { val: 'later', label: 'Tonight', desc: '7:30 PM' }].map(t => (
                      <button key={t.val} onClick={() => setDeliveryTime(t.val)}
                        className={`p-3 rounded-2xl border-2 text-center transition-all ${deliveryTime === t.val ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'}`}>
                        <div className={`font-bold ${deliveryTime === t.val ? 'text-orange-500' : 'text-gray-900 dark:text-white'}`}>{t.label}</div>
                        <div className="text-xs text-gray-400">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={() => setStep(1)} className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg flex items-center justify-center gap-2">
                  Continue to Payment <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-800">
                  <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-orange-500" /> Payment Method</h2>
                  <div className="space-y-3">
                    {paymentMethods.map(pm => {
                      const Icon = pm.icon;
                      return (
                        <label key={pm.id} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === pm.id ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
                          <input type="radio" name="payment" value={pm.id} checked={paymentMethod === pm.id} onChange={() => setPaymentMethod(pm.id)} className="accent-orange-500" />
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === pm.id ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm">{pm.label}</p>
                            <p className="text-xs text-gray-400">{pm.desc}</p>
                          </div>
                          {paymentMethod === pm.id && <Check className="w-5 h-5 text-orange-500 ml-auto" />}
                        </label>
                      );
                    })}
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="mt-4 space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                      <input placeholder="Card Number" className="input-base" />
                      <div className="grid grid-cols-2 gap-3">
                        <input placeholder="MM / YY" className="input-base" />
                        <input placeholder="CVV" className="input-base" />
                      </div>
                      <input placeholder="Cardholder Name" className="input-base" />
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(0)} className="flex-1 py-3.5 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                    ← Back
                  </button>
                  <button onClick={() => setStep(2)} className="flex-1 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg flex items-center justify-center gap-2">
                    Review Order <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-800">
                  <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-4">Order Review</h2>
                  <div className="space-y-3 mb-4">
                    {cart.map(item => {
                      const safeItem = item || {};
                      const qty = Number(safeItem.quantity ?? 0);
                      const price = Number(safeItem.price ?? 0);
                      return (
                        <div key={safeItem.id || `${String(safeItem.name || 'item')}-${qty}`} className="flex items-center gap-3">
                          <img src={safeItem.image || ''} alt={safeItem.name || 'Cart item'} className="w-14 h-14 rounded-xl object-cover" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white text-sm">{safeItem.name || 'Item'}</p>
                            <p className="text-gray-400 text-xs">Qty: {qty}</p>
                          </div>
                          <p className="font-bold text-gray-900 dark:text-white">₹{(price * qty).toLocaleString()}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Subtotal</span><span>₹{((subtotal ?? 0)).toLocaleString()}</span></div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>GST (12%)</span><span>₹{(gst ?? 0).toLocaleString ? (gst ?? 0).toLocaleString() : (gst ?? 0)}</span></div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Delivery</span><span className={(deliveryCharge ?? 0) === 0 ? 'text-green-500' : ''}>{(deliveryCharge ?? 0) === 0 ? 'FREE' : `₹${deliveryCharge ?? 0}`}</span></div>
                    {(couponDiscount ?? 0) > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{couponDiscount ?? 0}</span></div>}
                    <div className="flex justify-between font-black text-gray-900 dark:text-white text-base border-t border-gray-100 dark:border-gray-800 pt-2">
                      <span>Total</span><span className="text-orange-500">₹{((total ?? 0)).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm">
                    <p className="text-gray-500 dark:text-gray-400"><span className="font-medium text-gray-700 dark:text-gray-300">Delivering to:</span> Flat 4B, Sea View Apartments, Bandra West, Mumbai</p>
                    <p className="text-gray-500 dark:text-gray-400 mt-1"><span className="font-medium text-gray-700 dark:text-gray-300">Payment:</span> {paymentMethods.find(p => p.id === paymentMethod)?.label}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-3.5 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-2xl hover:bg-gray-50 transition-all">← Back</button>
                  <button onClick={placeOrder} disabled={loading} className="flex-1 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg disabled:opacity-70 flex items-center justify-center gap-2">
                    {loading ? <><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Placing Order...</> : '🎉 Place Order'}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-800 h-fit sticky top-24">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>
              <div className="space-y-3 max-h-72 overflow-y-auto no-scrollbar mb-4">
              {(cart || []).map(item => (
                <div key={item.id} className="flex items-center gap-2">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center font-bold">{item.quantity}</div>
                  </div>
                  <p className="flex-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-1">{item.name}</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">₹{(Number(item.price || 0) * Number(item.quantity || 0)).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm border-t border-gray-100 dark:border-gray-800 pt-4">
              <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Subtotal</span><span>₹{((subtotal ?? 0)).toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>GST</span><span>₹{(gst ?? 0).toLocaleString ? (gst ?? 0).toLocaleString() : (gst ?? 0)}</span></div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Delivery</span><span className={(deliveryCharge ?? 0) === 0 ? 'text-green-500 font-medium' : ''}>{(deliveryCharge ?? 0) === 0 ? 'FREE' : `₹${deliveryCharge ?? 0}`}</span></div>
              {(couponDiscount ?? 0) > 0 && <div className="flex justify-between text-green-600"><span>Coupon Discount</span><span>-₹{couponDiscount ?? 0}</span></div>}
              <div className="flex justify-between font-black text-gray-900 dark:text-white text-lg border-t border-gray-100 dark:border-gray-800 pt-2">
                <span>Total</span><span className="gradient-text">₹{((total ?? 0)).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
