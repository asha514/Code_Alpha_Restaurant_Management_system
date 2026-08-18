// Simple notifications controller returning mock notifications
const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'order', title: 'Order Confirmed!', message: 'Your order #ORD-2024-003 has been confirmed and is being prepared.', time: '2 mins ago', read: false },
  { id: 2, type: 'offer', title: 'Weekend Special!', message: 'Get 30% off this weekend. Use code WEEKEND30 at checkout.', time: '1 hour ago', read: false },
  { id: 3, type: 'reservation', title: 'Reservation Confirmed', message: 'Your table for 4 on Dec 20, 7:30 PM is confirmed.', time: '3 hours ago', read: true },
  { id: 4, type: 'order', title: 'Order Delivered!', message: 'Your order #ORD-2024-001 has been delivered. Enjoy your meal!', time: 'Yesterday', read: true },
];

export const list = async (req, res) => {
  try {
    console.log('[notifications] list request', { headers: req.headers && { host: req.headers.host, origin: req.headers.origin } });
    res.json(MOCK_NOTIFICATIONS);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const data = req.body;
    console.log('[notifications] create', data);
    const notif = { ...data, id: Date.now(), read: false };
    // In-memory only for now
    return res.status(201).json(notif);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('[notifications] remove', id);
    return res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
