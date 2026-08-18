import Order from '../models/Order.js';
import MenuItem from '../models/MenuItem.js';
import Reservation from '../models/Reservation.js';

export const stats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenueAgg = await Order.aggregate([{ $group: { _id: null, revenue: { $sum: '$total' } } }]);
    const totalRevenue = (totalRevenueAgg[0] && totalRevenueAgg[0].revenue) || 0;
    const reservations = await Reservation.countDocuments();
    const menuCount = await MenuItem.countDocuments();
    res.json({ totalOrders, totalRevenue, reservations, menuCount });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const reports = async (req, res) => {
  try {
    // simple sales by day report
    const sales = await Order.aggregate([
      { $group: { _id: '$createdAt', total: { $sum: '$total' } } },
      { $limit: 30 }
    ]);
    res.json({ sales });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
