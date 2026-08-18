export const site = async (req, res) => {
  try {
    const RESTAURANT_INFO = {
      name: 'Savoria',
      tagline: 'A Culinary Journey',
      description: 'Experience the finest dining with flavors crafted to perfection. Premium ingredients, master chefs, unforgettable memories.',
      address: '42 Gourmet Lane, Bandra West',
      phone: '+91 98765 43210',
      email: 'hello@savoria.in',
      website: 'www.savoria.in',
      currency: '₹',
      rating: 4.8,
      totalReviews: 2847,
      totalOrders: 45230,
      founded: '2019',
      tables: 32,
      chefs: 12,
    };
    const OFFERS = [
      { id: 'OFF10', code: 'OFF10', title: '10% Off on First Order', discount: 10, description: 'Get 10% off on your first online order. Minimum cart ₹499', validTill: '2026-12-31' },
      { id: 'BIRYANI50', code: 'BIRYANI50', title: '₹50 Off Biryani', discount: 50, description: 'Flat ₹50 off on any biryani. No min order.', validTill: '2026-11-30' },
      { id: 'FAMILY20', code: 'FAMILY20', title: '20% Off Family Feast', discount: 20, description: '20% off on family meal combos. Valid on dine-in & takeaway.', validTill: '2026-12-15' },
      { id: 'HAPPYHOUR', code: 'HAPPYHOUR', title: 'Buy 1 Get 1 (Drinks)', discount: 50, description: 'Buy one beverage, get one free between 4-6 PM.', validTill: '2026-10-31' },
      { id: 'WEEKEND30', code: 'WEEKEND30', title: '30% Off Weekend Brunch', discount: 30, description: 'Enjoy 30% off on our weekend brunch menu. Valid Sat-Sun.', validTill: '2026-12-31' },
    ];

    const TESTIMONIALS = [
      { id: 't1', name: 'Anita Sharma', role: 'Food Enthusiast', rating: 5, review: 'Best biryani in town — aromatic and perfectly spiced.', date: '2026-01-12' },
      { id: 't2', name: 'Rohit Verma', role: 'Regular', rating: 4, review: 'Great flavors and prompt delivery.', date: '2026-02-05' },
      { id: 't3', name: 'Priya Singh', role: 'Guest', rating: 5, review: 'Amazing ambiance and delightful desserts.', date: '2026-03-18' },
      { id: 't4', name: 'Sahil Kapoor', role: 'Patron', rating: 4, review: 'Consistent quality across visits.', date: '2026-04-22' },
      { id: 't5', name: 'Neha Rao', role: 'Visitor', rating: 5, review: 'Exceptional service and flavors. Highly recommend!', date: '2026-05-30' },
    ];
    const FAQ_DATA = [];
    const EMPLOYEES = [];
    const CUSTOMERS = [];
    res.json({ RESTAURANT_INFO, OFFERS, TESTIMONIALS, FAQ_DATA, EMPLOYEES, CUSTOMERS });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
