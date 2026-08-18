// =====================================================
// RESTAURANT MANAGEMENT SYSTEM — MOCK DATA
// =====================================================

export const RESTAURANT_INFO = {
  name: "Savoria",
  tagline: "A Culinary Journey",
  description: "Experience the finest dining with flavors crafted to perfection. Premium ingredients, master chefs, unforgettable memories.",
  address: "42 Gourmet Lane, Bandra West, Mumbai, MH 400050",
  phone: "+91 98765 43210",
  email: "hello@savoria.in",
  website: "www.savoria.in",
  openTime: "11:00 AM",
  closeTime: "11:00 PM",
  currency: "₹",
  rating: 4.8,
  totalReviews: 2847,
  totalOrders: 45230,
  founded: "2019",
  tables: 32,
  chefs: 12,
};

export const CATEGORIES = [
  { id: 1, name: "All", icon: "🍽️", color: "from-orange-400 to-red-500" },
  { id: 2, name: "Starters", icon: "🥗", color: "from-green-400 to-emerald-500" },
  { id: 3, name: "Main Course", icon: "🍛", color: "from-orange-400 to-amber-500" },
  { id: 4, name: "Biryani", icon: "🍚", color: "from-yellow-400 to-orange-500" },
  { id: 5, name: "Pizza", icon: "🍕", color: "from-red-400 to-pink-500" },
  { id: 6, name: "Burgers", icon: "🍔", color: "from-amber-400 to-yellow-500" },
  { id: 7, name: "Desserts", icon: "🍰", color: "from-pink-400 to-purple-500" },
  { id: 8, name: "Beverages", icon: "🥤", color: "from-blue-400 to-cyan-500" },
  { id: 9, name: "Soups", icon: "🍜", color: "from-teal-400 to-green-500" },
  { id: 10, name: "Wraps", icon: "🌯", color: "from-indigo-400 to-purple-500" },
];

export const MENU_ITEMS = [
  // Starters
  {
    id: 1, name: "Crispy Paneer Tikka", category: "Starters", price: 299, originalPrice: 399,
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&auto=format&fit=crop",
    description: "Succulent cottage cheese marinated in aromatic spices, grilled to perfection in a tandoor. Served with mint chutney and pickled onions.",
    rating: 4.8, reviews: 234, isVeg: true, isAvailable: true, isPopular: true, isNew: false,
    isBestSeller: true, isChefSpecial: false, discount: 25,
    tags: ["Spicy", "Grilled", "Popular"],
    prepTime: "20 mins", calories: 320, protein: "18g", carbs: "12g", fat: "22g",
    allergens: ["Dairy"],
    ingredients: ["Paneer", "Yogurt", "Spices", "Bell Peppers", "Onions"],
    badge: "Best Seller"
  },
  {
    id: 2, name: "Chicken Wings Buffalo Style", category: "Starters", price: 389, originalPrice: 389,
    image: "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=800&auto=format&fit=crop",
    description: "Crispy golden wings tossed in our signature buffalo sauce with a hint of garlic butter. Served with blue cheese dip.",
    rating: 4.9, reviews: 567, isVeg: false, isAvailable: true, isPopular: true, isNew: false,
    isBestSeller: true, isChefSpecial: true, discount: 0,
    tags: ["Spicy", "Crispy", "Must Try"],
    prepTime: "25 mins", calories: 450, protein: "32g", carbs: "8g", fat: "28g",
    allergens: ["Gluten"],
    ingredients: ["Chicken", "Buffalo Sauce", "Garlic", "Butter"],
    badge: "Chef's Special"
  },
  {
    id: 3, name: "Veg Spring Rolls", category: "Starters", price: 199, originalPrice: 249,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&auto=format&fit=crop",
    description: "Crunchy golden rolls stuffed with fresh vegetables and glass noodles. Served with sweet chili sauce.",
    rating: 4.5, reviews: 189, isVeg: true, isAvailable: true, isPopular: false, isNew: true,
    isBestSeller: false, isChefSpecial: false, discount: 20,
    tags: ["Crispy", "New"],
    prepTime: "15 mins", calories: 280, protein: "8g", carbs: "32g", fat: "12g",
    allergens: ["Gluten"],
    badge: "New"
  },
  {
    id: 4, name: "Mutton Seekh Kebab", category: "Starters", price: 449, originalPrice: 549,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop",
    description: "Minced mutton mixed with fresh herbs and spices, skewered and cooked in a clay oven. A royal delicacy.",
    rating: 4.7, reviews: 312, isVeg: false, isAvailable: true, isPopular: true, isNew: false,
    isBestSeller: false, isChefSpecial: true, discount: 18,
    tags: ["Spicy", "Grilled"],
    prepTime: "30 mins", calories: 520, protein: "42g", carbs: "5g", fat: "35g",
    allergens: [],
    badge: "Chef's Special"
  },
  {
    id: 5, name: "Bruschetta Al Pomodoro", category: "Starters", price: 249, originalPrice: 249,
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&auto=format&fit=crop",
    description: "Toasted artisan bread topped with diced tomatoes, fresh basil, garlic, and extra virgin olive oil.",
    rating: 4.3, reviews: 98, isVeg: true, isAvailable: true, isPopular: false, isNew: true,
    isBestSeller: false, isChefSpecial: false, discount: 0,
    tags: ["Italian", "Fresh"],
    prepTime: "10 mins", calories: 180, protein: "5g", carbs: "28g", fat: "6g",
    allergens: ["Gluten"],
    badge: "New"
  },

  // Main Course
  {
    id: 6, name: "Butter Chicken Masala", category: "Main Course", price: 449, originalPrice: 549,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop",
    description: "Tender chicken pieces in a rich, creamy tomato-based sauce with aromatic spices. A timeless classic.",
    rating: 4.9, reviews: 892, isVeg: false, isAvailable: true, isPopular: true, isNew: false,
    isBestSeller: true, isChefSpecial: false, discount: 18,
    tags: ["Mild", "Creamy", "Classic"],
    prepTime: "35 mins", calories: 580, protein: "38g", carbs: "15g", fat: "40g",
    allergens: ["Dairy"],
    badge: "Best Seller"
  },
  {
    id: 7, name: "Dal Makhani", category: "Main Course", price: 299, originalPrice: 349,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop",
    description: "Slow-cooked black lentils in a buttery, creamy sauce. Simmered overnight for deep, rich flavors.",
    rating: 4.7, reviews: 445, isVeg: true, isAvailable: true, isPopular: true, isNew: false,
    isBestSeller: true, isChefSpecial: false, discount: 14,
    tags: ["Comfort Food", "Classic"],
    prepTime: "40 mins", calories: 420, protein: "18g", carbs: "52g", fat: "18g",
    allergens: ["Dairy"],
    badge: "Best Seller"
  },
  {
    id: 8, name: "Grilled Salmon Fillet", category: "Main Course", price: 799, originalPrice: 999,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop",
    description: "Norwegian salmon grilled to perfection with lemon herb butter. Served with asparagus and roasted potatoes.",
    rating: 4.8, reviews: 267, isVeg: false, isAvailable: true, isPopular: false, isNew: false,
    isBestSeller: false, isChefSpecial: true, discount: 20,
    tags: ["Healthy", "Premium", "Omega-3"],
    prepTime: "25 mins", calories: 480, protein: "52g", carbs: "12g", fat: "24g",
    allergens: ["Fish"],
    badge: "Chef's Special"
  },
  {
    id: 9, name: "Paneer Lababdar", category: "Main Course", price: 349, originalPrice: 399,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop",
    description: "Velvety paneer cubes in a tangy onion-tomato gravy with kashmiri spices. Rich and indulgent.",
    rating: 4.6, reviews: 334, isVeg: true, isAvailable: true, isPopular: true, isNew: false,
    isBestSeller: false, isChefSpecial: false, discount: 13,
    tags: ["Rich", "Veg", "Spicy"],
    prepTime: "30 mins", calories: 480, protein: "22g", carbs: "18g", fat: "34g",
    allergens: ["Dairy"],
    badge: null
  },
  {
    id: 10, name: "Lamb Rogan Josh", category: "Main Course", price: 599, originalPrice: 699,
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&auto=format&fit=crop",
    description: "Slow-braised lamb in a Kashmiri spice blend with whole aromatics. A heritage recipe passed down generations.",
    rating: 4.9, reviews: 178, isVeg: false, isAvailable: true, isPopular: false, isNew: false,
    isBestSeller: false, isChefSpecial: true, discount: 14,
    tags: ["Spicy", "Heritage", "Premium"],
    prepTime: "45 mins", calories: 620, protein: "45g", carbs: "10g", fat: "42g",
    allergens: [],
    badge: "Chef's Special"
  },

  // Biryani
  {
    id: 11, name: "Hyderabadi Dum Biryani", category: "Biryani", price: 549, originalPrice: 649,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop",
    description: "Authentic Hyderabadi biryani slow-cooked in dum style with basmati rice, tender mutton, and saffron.",
    rating: 4.9, reviews: 1204, isVeg: false, isAvailable: true, isPopular: true, isNew: false,
    isBestSeller: true, isChefSpecial: true, discount: 15,
    tags: ["Hyderabadi", "Slow Cooked", "Saffron"],
    prepTime: "60 mins", calories: 720, protein: "42g", carbs: "85g", fat: "28g",
    allergens: ["Dairy"],
    badge: "Best Seller"
  },
  {
    id: 12, name: "Chicken Dum Biryani", category: "Biryani", price: 449, originalPrice: 499,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop",
    description: "Fragrant basmati rice layered with marinated chicken and caramelized onions, sealed and cooked in dum.",
    rating: 4.8, reviews: 978, isVeg: false, isAvailable: true, isPopular: true, isNew: false,
    isBestSeller: true, isChefSpecial: false, discount: 10,
    tags: ["Fragrant", "Layered"],
    prepTime: "50 mins", calories: 680, protein: "38g", carbs: "78g", fat: "25g",
    allergens: ["Dairy"],
    badge: "Popular"
  },
  {
    id: 13, name: "Veg Dum Biryani", category: "Biryani", price: 349, originalPrice: 399,
    image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=800&auto=format&fit=crop",
    description: "Aromatic basmati rice with seasonal vegetables, dry fruits, and saffron. A wholesome vegetarian treat.",
    rating: 4.6, reviews: 445, isVeg: true, isAvailable: true, isPopular: false, isNew: false,
    isBestSeller: false, isChefSpecial: false, discount: 13,
    tags: ["Veg", "Aromatic"],
    prepTime: "45 mins", calories: 560, protein: "14g", carbs: "82g", fat: "18g",
    allergens: ["Dairy", "Nuts"],
    badge: null
  },

  // Pizza
  {
    id: 14, name: "Margherita Wood-Fired", category: "Pizza", price: 399, originalPrice: 449,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop",
    description: "Classic Margherita with San Marzano tomato sauce, fresh mozzarella, and basil on a hand-tossed crust.",
    rating: 4.7, reviews: 567, isVeg: true, isAvailable: true, isPopular: true, isNew: false,
    isBestSeller: false, isChefSpecial: false, discount: 11,
    tags: ["Italian", "Classic"],
    prepTime: "20 mins", calories: 520, protein: "22g", carbs: "65g", fat: "18g",
    allergens: ["Gluten", "Dairy"],
    badge: null
  },
  {
    id: 15, name: "BBQ Chicken Supreme", category: "Pizza", price: 549, originalPrice: 649,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop",
    description: "Smoky BBQ sauce, grilled chicken, caramelized onions, jalapeños, and a four-cheese blend.",
    rating: 4.8, reviews: 723, isVeg: false, isAvailable: true, isPopular: true, isNew: false,
    isBestSeller: true, isChefSpecial: false, discount: 15,
    tags: ["BBQ", "Smoky", "Loaded"],
    prepTime: "25 mins", calories: 680, protein: "38g", carbs: "72g", fat: "28g",
    allergens: ["Gluten", "Dairy"],
    badge: "Best Seller"
  },
  {
    id: 16, name: "Truffle Mushroom Pizza", category: "Pizza", price: 649, originalPrice: 749,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop",
    description: "Wild mushrooms, truffle oil, gruyere, and fresh herbs on a thin crispy base. Pure luxury on a plate.",
    rating: 4.9, reviews: 234, isVeg: true, isAvailable: true, isPopular: false, isNew: true,
    isBestSeller: false, isChefSpecial: true, discount: 13,
    tags: ["Truffle", "Gourmet", "New"],
    prepTime: "22 mins", calories: 590, protein: "18g", carbs: "68g", fat: "26g",
    allergens: ["Gluten", "Dairy"],
    badge: "New"
  },

  // Burgers
  {
    id: 17, name: "Savoria Signature Burger", category: "Burgers", price: 449, originalPrice: 549,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
    description: "Double smash patty, aged cheddar, caramelized onions, truffle mayo, and pickles on a brioche bun.",
    rating: 4.9, reviews: 892, isVeg: false, isAvailable: true, isPopular: true, isNew: false,
    isBestSeller: true, isChefSpecial: true, discount: 18,
    tags: ["Smash", "Double Patty", "Truffle"],
    prepTime: "20 mins", calories: 780, protein: "45g", carbs: "55g", fat: "48g",
    allergens: ["Gluten", "Dairy"],
    badge: "Best Seller"
  },
  {
    id: 18, name: "Crispy Chicken Burger", category: "Burgers", price: 349, originalPrice: 399,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&auto=format&fit=crop",
    description: "Crispy fried chicken thigh with coleslaw, sriracha mayo, and dill pickles on a toasted bun.",
    rating: 4.7, reviews: 645, isVeg: false, isAvailable: true, isPopular: true, isNew: false,
    isBestSeller: true, isChefSpecial: false, discount: 13,
    tags: ["Crispy", "Spicy"],
    prepTime: "18 mins", calories: 650, protein: "38g", carbs: "52g", fat: "35g",
    allergens: ["Gluten", "Dairy"],
    badge: "Popular"
  },
  {
    id: 19, name: "Mushroom Swiss Veggie Burger", category: "Burgers", price: 299, originalPrice: 349,
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800&auto=format&fit=crop",
    description: "Juicy portobello mushroom patty with Swiss cheese, arugula, and garlic aioli.",
    rating: 4.5, reviews: 234, isVeg: true, isAvailable: true, isPopular: false, isNew: false,
    isBestSeller: false, isChefSpecial: false, discount: 14,
    tags: ["Veg", "Healthy"],
    prepTime: "15 mins", calories: 480, protein: "18g", carbs: "58g", fat: "22g",
    allergens: ["Gluten", "Dairy"],
    badge: null
  },

  // Desserts
  {
    id: 20, name: "Belgian Chocolate Lava Cake", category: "Desserts", price: 299, originalPrice: 349,
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&auto=format&fit=crop",
    description: "Warm dark chocolate cake with a molten center, served with vanilla bean ice cream and berry coulis.",
    rating: 4.9, reviews: 789, isVeg: true, isAvailable: true, isPopular: true, isNew: false,
    isBestSeller: true, isChefSpecial: true, discount: 14,
    tags: ["Chocolate", "Warm", "Indulgent"],
    prepTime: "15 mins", calories: 580, protein: "8g", carbs: "72g", fat: "28g",
    allergens: ["Gluten", "Dairy", "Eggs"],
    badge: "Best Seller"
  },
  {
    id: 21, name: "Gulab Jamun Cheesecake", category: "Desserts", price: 349, originalPrice: 349,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format&fit=crop",
    description: "A stunning fusion of classic cheesecake with Gulab Jamun. Topped with rose syrup and pistachios.",
    rating: 4.8, reviews: 456, isVeg: true, isAvailable: true, isPopular: true, isNew: true,
    isBestSeller: false, isChefSpecial: true, discount: 0,
    tags: ["Fusion", "New", "Indulgent"],
    prepTime: "10 mins", calories: 520, protein: "8g", carbs: "68g", fat: "24g",
    allergens: ["Dairy", "Gluten", "Eggs"],
    badge: "New"
  },
  {
    id: 22, name: "Mango Panna Cotta", category: "Desserts", price: 249, originalPrice: 299,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop",
    description: "Silky smooth Italian panna cotta infused with fresh Alphonso mango. Light and refreshing.",
    rating: 4.6, reviews: 312, isVeg: true, isAvailable: true, isPopular: false, isNew: false,
    isBestSeller: false, isChefSpecial: false, discount: 17,
    tags: ["Italian", "Light", "Seasonal"],
    prepTime: "5 mins", calories: 320, protein: "4g", carbs: "48g", fat: "12g",
    allergens: ["Dairy"],
    badge: null
  },

  // Beverages
  {
    id: 23, name: "Mango Lassi", category: "Beverages", price: 149, originalPrice: 199,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop",
    description: "Thick, creamy yogurt blended with fresh Alphonso mango pulp and a hint of cardamom.",
    rating: 4.7, reviews: 678, isVeg: true, isAvailable: true, isPopular: true, isNew: false,
    isBestSeller: true, isChefSpecial: false, discount: 25,
    tags: ["Cold", "Sweet", "Refreshing"],
    prepTime: "5 mins", calories: 220, protein: "6g", carbs: "38g", fat: "6g",
    allergens: ["Dairy"],
    badge: "Popular"
  },
  {
    id: 24, name: "Cold Brew Coffee", category: "Beverages", price: 199, originalPrice: 249,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&auto=format&fit=crop",
    description: "24-hour cold steeped single origin coffee, smooth with low acidity. Served over hand-cut ice.",
    rating: 4.8, reviews: 445, isVeg: true, isAvailable: true, isPopular: true, isNew: false,
    isBestSeller: false, isChefSpecial: false, discount: 20,
    tags: ["Cold", "Strong", "Artisan"],
    prepTime: "5 mins", calories: 40, protein: "1g", carbs: "6g", fat: "0g",
    allergens: [],
    badge: null
  },
  {
    id: 25, name: "Fresh Lime Soda", category: "Beverages", price: 99, originalPrice: 129,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop",
    description: "Freshly squeezed lime juice with sparkling water, mint leaves, and a choice of sweet or salted.",
    rating: 4.5, reviews: 234, isVeg: true, isAvailable: true, isPopular: false, isNew: false,
    isBestSeller: false, isChefSpecial: false, discount: 23,
    tags: ["Refreshing", "Light"],
    prepTime: "3 mins", calories: 60, protein: "0g", carbs: "14g", fat: "0g",
    allergens: [],
    badge: null
  },
  {
    id: 26, name: "Virgin Mojito", category: "Beverages", price: 179, originalPrice: 179,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&auto=format&fit=crop",
    description: "Muddled mint, fresh lime, sugar syrup, and sparkling water. The perfect thirst quencher.",
    rating: 4.6, reviews: 345, isVeg: true, isAvailable: true, isPopular: true, isNew: false,
    isBestSeller: false, isChefSpecial: false, discount: 0,
    tags: ["Mocktail", "Mint", "Refreshing"],
    prepTime: "5 mins", calories: 90, protein: "0g", carbs: "22g", fat: "0g",
    allergens: [],
    badge: null
  },

  // Soups
  {
    id: 27, name: "Tom Yum Soup", category: "Soups", price: 249, originalPrice: 299,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop",
    description: "Authentic Thai hot and sour soup with lemongrass, galangal, kaffir lime, and fresh mushrooms.",
    rating: 4.7, reviews: 234, isVeg: false, isAvailable: true, isPopular: false, isNew: false,
    isBestSeller: false, isChefSpecial: true, discount: 17,
    tags: ["Thai", "Spicy", "Hot"],
    prepTime: "20 mins", calories: 180, protein: "12g", carbs: "18g", fat: "6g",
    allergens: ["Shellfish"],
    badge: "Chef's Special"
  },
  {
    id: 28, name: "Cream of Mushroom", category: "Soups", price: 199, originalPrice: 249,
    image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&auto=format&fit=crop",
    description: "Velvety smooth cream of mixed mushroom soup with truffle oil drizzle and herbed croutons.",
    rating: 4.6, reviews: 189, isVeg: true, isAvailable: true, isPopular: false, isNew: false,
    isBestSeller: false, isChefSpecial: false, discount: 20,
    tags: ["Creamy", "Veg"],
    prepTime: "15 mins", calories: 240, protein: "6g", carbs: "22g", fat: "14g",
    allergens: ["Dairy", "Gluten"],
    badge: null
  },

  // Wraps
  {
    id: 29, name: "Grilled Chicken Caesar Wrap", category: "Wraps", price: 299, originalPrice: 349,
    image: "https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=800&auto=format&fit=crop",
    description: "Grilled chicken, romaine lettuce, parmesan, and classic Caesar dressing in a warm tortilla.",
    rating: 4.6, reviews: 267, isVeg: false, isAvailable: true, isPopular: true, isNew: false,
    isBestSeller: false, isChefSpecial: false, discount: 14,
    tags: ["Healthy", "Grilled"],
    prepTime: "15 mins", calories: 480, protein: "35g", carbs: "42g", fat: "18g",
    allergens: ["Gluten", "Dairy"],
    badge: "Popular"
  },
  {
    id: 30, name: "Paneer Tikka Kathi Roll", category: "Wraps", price: 249, originalPrice: 299,
    image: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=800&auto=format&fit=crop",
    description: "Chargrilled paneer tikka, onions, peppers, and chutneys wrapped in a flaky paratha. Mumbai street style.",
    rating: 4.8, reviews: 523, isVeg: true, isAvailable: true, isPopular: true, isNew: false,
    isBestSeller: true, isChefSpecial: false, discount: 17,
    tags: ["Street Style", "Indian"],
    prepTime: "15 mins", calories: 420, protein: "18g", carbs: "52g", fat: "16g",
    allergens: ["Gluten", "Dairy"],
    badge: "Best Seller"
  },
];

// =====================================================
// TABLES
// =====================================================

export const TABLES = [
  { id: "T01", number: 1, capacity: 2, status: "available", section: "Window", x: 10, y: 10 },
  { id: "T02", number: 2, capacity: 2, status: "occupied", section: "Window", x: 25, y: 10 },
  { id: "T03", number: 3, capacity: 4, status: "available", section: "Window", x: 40, y: 10 },
  { id: "T04", number: 4, capacity: 4, status: "reserved", section: "Center", x: 10, y: 35 },
  { id: "T05", number: 5, capacity: 6, status: "occupied", section: "Center", x: 27, y: 35 },
  { id: "T06", number: 6, capacity: 6, status: "available", section: "Center", x: 47, y: 35 },
  { id: "T07", number: 7, capacity: 4, status: "cleaning", section: "Center", x: 65, y: 35 },
  { id: "T08", number: 8, capacity: 2, status: "available", section: "Garden", x: 10, y: 60 },
  { id: "T09", number: 9, capacity: 4, status: "reserved", section: "Garden", x: 25, y: 60 },
  { id: "T10", number: 10, capacity: 8, status: "available", section: "Private", x: 45, y: 60 },
  { id: "T11", number: 11, capacity: 2, status: "occupied", section: "Bar", x: 68, y: 10 },
  { id: "T12", number: 12, capacity: 2, status: "available", section: "Bar", x: 80, y: 10 },
  { id: "T13", number: 13, capacity: 4, status: "reserved", section: "Patio", x: 68, y: 60 },
  { id: "T14", number: 14, capacity: 4, status: "available", section: "Patio", x: 80, y: 60 },
  { id: "T15", number: 15, capacity: 10, status: "available", section: "Banquet", x: 80, y: 35 },
];

// =====================================================
// ORDERS
// =====================================================

export const ORDERS = [
  {
    id: "ORD-2024-001",
    date: "2024-12-15",
    time: "7:30 PM",
    status: "delivered",
    items: [
      { ...MENU_ITEMS[0], quantity: 2 },
      { ...MENU_ITEMS[5], quantity: 1 },
      { ...MENU_ITEMS[22], quantity: 2 },
    ],
    subtotal: 1395,
    gst: 167,
    deliveryCharge: 40,
    discount: 100,
    total: 1502,
    address: "42 Bandra West, Mumbai",
    paymentMethod: "UPI",
    estimatedTime: "45 mins",
    deliveredAt: "8:15 PM",
    timeline: [
      { status: "placed", time: "7:30 PM", done: true },
      { status: "confirmed", time: "7:32 PM", done: true },
      { status: "preparing", time: "7:35 PM", done: true },
      { status: "cooking", time: "7:45 PM", done: true },
      { status: "ready", time: "8:05 PM", done: true },
      { status: "delivered", time: "8:15 PM", done: true },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2024-12-14",
    time: "1:00 PM",
    status: "delivered",
    items: [
      { ...MENU_ITEMS[10], quantity: 1 },
      { ...MENU_ITEMS[19], quantity: 1 },
    ],
    subtotal: 848,
    gst: 102,
    deliveryCharge: 0,
    discount: 50,
    total: 900,
    address: "42 Bandra West, Mumbai",
    paymentMethod: "Credit Card",
    timeline: [
      { status: "placed", time: "1:00 PM", done: true },
      { status: "confirmed", time: "1:02 PM", done: true },
      { status: "preparing", time: "1:05 PM", done: true },
      { status: "cooking", time: "1:20 PM", done: true },
      { status: "ready", time: "1:50 PM", done: true },
      { status: "delivered", time: "2:05 PM", done: true },
    ],
  },
  {
    id: "ORD-2024-003",
    date: "2024-12-16",
    time: "8:00 PM",
    status: "preparing",
    items: [
      { ...MENU_ITEMS[16], quantity: 1 },
      { ...MENU_ITEMS[14], quantity: 1 },
      { ...MENU_ITEMS[23], quantity: 2 },
    ],
    subtotal: 796,
    gst: 95,
    deliveryCharge: 40,
    discount: 0,
    total: 931,
    address: "42 Bandra West, Mumbai",
    paymentMethod: "Cash on Delivery",
    estimatedTime: "35 mins",
    timeline: [
      { status: "placed", time: "8:00 PM", done: true },
      { status: "confirmed", time: "8:02 PM", done: true },
      { status: "preparing", time: "8:05 PM", done: true },
      { status: "cooking", time: "", done: false },
      { status: "ready", time: "", done: false },
      { status: "delivered", time: "", done: false },
    ],
  },
];

// =====================================================
// RESERVATIONS
// =====================================================

export const RESERVATIONS = [
  {
    id: "RES-001",
    name: "Arjun Sharma",
    phone: "+91 98765 43210",
    email: "arjun@email.com",
    date: "2024-12-20",
    time: "7:30 PM",
    guests: 4,
    tableId: "T05",
    status: "confirmed",
    notes: "Birthday celebration - need a cake",
    occasion: "Birthday",
  },
  {
    id: "RES-002",
    name: "Priya Patel",
    phone: "+91 87654 32109",
    email: "priya@email.com",
    date: "2024-12-21",
    time: "8:00 PM",
    guests: 2,
    tableId: "T02",
    status: "pending",
    notes: "Anniversary dinner",
    occasion: "Anniversary",
  },
  {
    id: "RES-003",
    name: "Rohit Kumar",
    phone: "+91 76543 21098",
    email: "rohit@email.com",
    date: "2024-12-22",
    time: "1:00 PM",
    guests: 6,
    tableId: "T06",
    status: "confirmed",
    notes: "Business lunch",
    occasion: "Business",
  },
];

// =====================================================
// CUSTOMERS
// =====================================================

export const CUSTOMERS = [
  { id: "C001", name: "Arjun Sharma", email: "arjun@email.com", phone: "+91 98765 43210", totalOrders: 24, totalSpent: 18540, joinDate: "2023-03-15", status: "active", avatar: "AS", tier: "Gold" },
  { id: "C002", name: "Priya Patel", email: "priya@email.com", phone: "+91 87654 32109", totalOrders: 18, totalSpent: 12350, joinDate: "2023-05-22", status: "active", avatar: "PP", tier: "Silver" },
  { id: "C003", name: "Rohit Kumar", email: "rohit@email.com", phone: "+91 76543 21098", totalOrders: 42, totalSpent: 32800, joinDate: "2022-11-10", status: "active", avatar: "RK", tier: "Platinum" },
  { id: "C004", name: "Sneha Reddy", email: "sneha@email.com", phone: "+91 65432 10987", totalOrders: 8, totalSpent: 5420, joinDate: "2024-01-05", status: "active", avatar: "SR", tier: "Bronze" },
  { id: "C005", name: "Vikram Singh", email: "vikram@email.com", phone: "+91 54321 09876", totalOrders: 31, totalSpent: 24600, joinDate: "2023-02-28", status: "inactive", avatar: "VS", tier: "Gold" },
  { id: "C006", name: "Anjali Nair", email: "anjali@email.com", phone: "+91 43210 98765", totalOrders: 15, totalSpent: 9870, joinDate: "2023-08-14", status: "active", avatar: "AN", tier: "Silver" },
  { id: "C007", name: "Karan Malhotra", email: "karan@email.com", phone: "+91 32109 87654", totalOrders: 56, totalSpent: 45200, joinDate: "2022-06-20", status: "active", avatar: "KM", tier: "Platinum" },
  { id: "C008", name: "Meera Iyer", email: "meera@email.com", phone: "+91 21098 76543", totalOrders: 6, totalSpent: 3240, joinDate: "2024-02-15", status: "active", avatar: "MI", tier: "Bronze" },
];

// =====================================================
// EMPLOYEES
// =====================================================

export const EMPLOYEES = [
  { id: "E001", name: "Chef Marco Rossi", role: "Head Chef", department: "Kitchen", salary: 85000, joinDate: "2019-03-01", status: "active", avatar: "MR", rating: 4.9, shift: "Morning" },
  { id: "E002", name: "Chef Amit Sharma", role: "Sous Chef", department: "Kitchen", salary: 65000, joinDate: "2020-06-15", status: "active", avatar: "AS", rating: 4.7, shift: "Evening" },
  { id: "E003", name: "Priya Menon", role: "Restaurant Manager", department: "Management", salary: 75000, joinDate: "2019-08-20", status: "active", avatar: "PM", rating: 4.8, shift: "Full Day" },
  { id: "E004", name: "Rahul Desai", role: "Senior Waiter", department: "Service", salary: 35000, joinDate: "2021-02-10", status: "active", avatar: "RD", rating: 4.6, shift: "Evening" },
  { id: "E005", name: "Sunita Rao", role: "Cashier", department: "Finance", salary: 32000, joinDate: "2021-09-05", status: "active", avatar: "SR", rating: 4.5, shift: "Morning" },
  { id: "E006", name: "Dev Patel", role: "Bar Manager", department: "Bar", salary: 55000, joinDate: "2020-11-22", status: "active", avatar: "DP", rating: 4.7, shift: "Evening" },
  { id: "E007", name: "Kavya Nair", role: "Hostess", department: "Service", salary: 28000, joinDate: "2022-04-18", status: "active", avatar: "KN", rating: 4.8, shift: "Full Day" },
  { id: "E008", name: "Mohan Tiwari", role: "Kitchen Helper", department: "Kitchen", salary: 22000, joinDate: "2023-01-10", status: "inactive", avatar: "MT", rating: 4.2, shift: "Morning" },
];

// =====================================================
// INVENTORY
// =====================================================

export const INVENTORY = [
  { id: "INV001", name: "Basmati Rice", category: "Grains", unit: "kg", stock: 45, minStock: 20, maxStock: 100, price: 120, expiryDate: "2025-06-30", supplier: "Royal Agro", status: "normal" },
  { id: "INV002", name: "Chicken Breast", category: "Protein", unit: "kg", stock: 8, minStock: 15, maxStock: 50, price: 320, expiryDate: "2024-12-18", supplier: "Fresh Farm", status: "low" },
  { id: "INV003", name: "Paneer", category: "Dairy", unit: "kg", stock: 12, minStock: 10, maxStock: 30, price: 280, expiryDate: "2024-12-17", supplier: "Amul", status: "normal" },
  { id: "INV004", name: "Mozzarella Cheese", category: "Dairy", unit: "kg", stock: 3, minStock: 8, maxStock: 25, price: 520, expiryDate: "2024-12-20", supplier: "Lactalis", status: "low" },
  { id: "INV005", name: "Tomatoes", category: "Vegetables", unit: "kg", stock: 0, minStock: 10, maxStock: 40, price: 40, expiryDate: "2024-12-16", supplier: "Local Market", status: "out" },
  { id: "INV006", name: "Onions", category: "Vegetables", unit: "kg", stock: 35, minStock: 15, maxStock: 60, price: 25, expiryDate: "2024-12-30", supplier: "Local Market", status: "normal" },
  { id: "INV007", name: "Butter", category: "Dairy", unit: "kg", stock: 6, minStock: 5, maxStock: 20, price: 480, expiryDate: "2024-12-25", supplier: "Amul", status: "normal" },
  { id: "INV008", name: "All Purpose Flour", category: "Grains", unit: "kg", stock: 28, minStock: 15, maxStock: 60, price: 45, expiryDate: "2025-03-15", supplier: "Pillsbury", status: "normal" },
  { id: "INV009", name: "Salmon Fillet", category: "Seafood", unit: "kg", stock: 4, minStock: 8, maxStock: 20, price: 850, expiryDate: "2024-12-17", supplier: "Ocean Fresh", status: "low" },
  { id: "INV010", name: "Cream", category: "Dairy", unit: "ltr", stock: 15, minStock: 10, maxStock: 40, price: 180, expiryDate: "2024-12-22", supplier: "Amul", status: "normal" },
  { id: "INV011", name: "Olive Oil", category: "Oils", unit: "ltr", stock: 8, minStock: 5, maxStock: 20, price: 680, expiryDate: "2025-08-20", supplier: "Borges", status: "normal" },
  { id: "INV012", name: "Garlic", category: "Vegetables", unit: "kg", stock: 5, minStock: 5, maxStock: 20, price: 80, expiryDate: "2024-12-28", supplier: "Local Market", status: "low" },
];

// =====================================================
// OFFERS / COUPONS
// =====================================================

export const OFFERS = [
  {
    id: "OFF001", code: "SAVE20", title: "20% Off on First Order", description: "Get 20% discount on your very first order with us.",
    discount: 20, type: "percentage", minOrder: 500, maxDiscount: 200, validTill: "2024-12-31",
    gradient: "from-orange-400 to-red-500", icon: "🎉", isActive: true,
  },
  {
    id: "OFF002", code: "FLAT100", title: "₹100 Off", description: "Flat ₹100 discount on orders above ₹800.",
    discount: 100, type: "flat", minOrder: 800, maxDiscount: 100, validTill: "2024-12-25",
    gradient: "from-purple-400 to-blue-500", icon: "💰", isActive: true,
  },
  {
    id: "OFF003", code: "FREESHIP", title: "Free Delivery", description: "Free delivery on all orders above ₹500.",
    discount: 40, type: "delivery", minOrder: 500, maxDiscount: 40, validTill: "2024-12-20",
    gradient: "from-emerald-400 to-blue-500", icon: "🚚", isActive: true,
  },
  {
    id: "OFF004", code: "WEEKEND30", title: "Weekend Special 30%", description: "Enjoy 30% off every Saturday and Sunday.",
    discount: 30, type: "percentage", minOrder: 600, maxDiscount: 300, validTill: "2024-12-31",
    gradient: "from-pink-400 to-purple-500", icon: "🎊", isActive: true,
  },
];

// =====================================================
// TESTIMONIALS
// =====================================================

export const TESTIMONIALS = [
  {
    id: 1, name: "Aarav Shah", role: "Food Blogger", rating: 5,
    review: "Savoria is hands down the best dining experience in Mumbai. The Hyderabadi Biryani is absolutely divine, and the ambiance is just perfect for any occasion.",
    avatar: "AS", date: "Dec 2024",
  },
  {
    id: 2, name: "Deepika Menon", role: "Corporate Executive", rating: 5,
    review: "We host all our business dinners at Savoria. The private dining section is impeccable, service is world-class, and the food quality is consistently outstanding.",
    avatar: "DM", date: "Nov 2024",
  },
  {
    id: 3, name: "Nikhil Verma", role: "Food Enthusiast", rating: 4,
    review: "The Butter Chicken here sets the bar. Creamy, aromatic, perfectly balanced — exactly how it should be. The online ordering system is also super smooth!",
    avatar: "NV", date: "Dec 2024",
  },
  {
    id: 4, name: "Riya Kapoor", role: "Interior Designer", rating: 5,
    review: "From the stunning décor to the meticulously crafted dishes, every detail at Savoria speaks of luxury and passion. It's our family's go-to celebration spot!",
    avatar: "RK", date: "Dec 2024",
  },
  {
    id: 5, name: "Sanjay Gupta", role: "Entrepreneur", rating: 5,
    review: "What impresses me most is the consistency. Whether I visit on a Tuesday or a Saturday evening, the food quality and service are always exceptional.",
    avatar: "SG", date: "Nov 2024",
  },
];

// =====================================================
// ANALYTICS DATA
// =====================================================

export const ANALYTICS = {
  daily: [
    { time: "6 AM", revenue: 2400, orders: 12 },
    { time: "8 AM", revenue: 3800, orders: 19 },
    { time: "10 AM", revenue: 2200, orders: 11 },
    { time: "12 PM", revenue: 8900, orders: 45 },
    { time: "2 PM", revenue: 6700, orders: 33 },
    { time: "4 PM", revenue: 4200, orders: 21 },
    { time: "6 PM", revenue: 11400, orders: 57 },
    { time: "8 PM", revenue: 13800, orders: 69 },
    { time: "10 PM", revenue: 9200, orders: 46 },
  ],
  weekly: [
    { day: "Mon", revenue: 45000, orders: 142 },
    { day: "Tue", revenue: 38000, orders: 119 },
    { day: "Wed", revenue: 52000, orders: 163 },
    { day: "Thu", revenue: 48000, orders: 151 },
    { day: "Fri", revenue: 78000, orders: 245 },
    { day: "Sat", revenue: 94000, orders: 295 },
    { day: "Sun", revenue: 88000, orders: 276 },
  ],
  monthly: [
    { month: "Jul", revenue: 420000 }, { month: "Aug", revenue: 480000 },
    { month: "Sep", revenue: 445000 }, { month: "Oct", revenue: 510000 },
    { month: "Nov", revenue: 560000 }, { month: "Dec", revenue: 620000 },
  ],
  categoryRevenue: [
    { name: "Main Course", value: 38, color: "#F97316" },
    { name: "Biryani", value: 22, color: "#8B5CF6" },
    { name: "Pizza", value: 15, color: "#EF4444" },
    { name: "Burgers", value: 12, color: "#F59E0B" },
    { name: "Desserts", value: 8, color: "#EC4899" },
    { name: "Beverages", value: 5, color: "#10B981" },
  ],
  kpi: {
    totalRevenue: 2840000,
    revenueGrowth: 18.5,
    totalOrders: 8920,
    ordersGrowth: 12.3,
    totalCustomers: 3420,
    customersGrowth: 8.7,
    avgOrderValue: 318,
    avgOrderGrowth: 5.2,
    tableOccupancy: 78,
    occupancyGrowth: 4.1,
    customerSatisfaction: 4.8,
    satisfactionGrowth: 0.2,
  },
};

// =====================================================
// TESTIMONIALS (GENERATED)
// NOTE: Renamed to TESTIMONIALS_LARGE to avoid colliding with the primary TESTIMONIALS export above.
// =====================================================
const _reviewTemplates = [
  'Absolutely loved the flavors and presentation. Highly recommended!',
  'The service was exceptional and the dishes were perfect.',
  'Delicious food, great ambiance, will visit again.',
  'Good value for money and friendly staff.',
  'An unforgettable dining experience. The biryani was outstanding.'
];

export const TESTIMONIALS_LARGE = Array.from({ length: 1000 }).map((_, i) => {
  const idx = i % _reviewTemplates.length;
  return {
    id: `r-${i + 1}`,
    name: `Guest ${i + 1}`,
    role: ['Food Lover', 'Regular', 'Patron', 'Visitor'][i % 4],
    rating: 4 + (i % 2),
    review: _reviewTemplates[idx],
    avatar: `G${(i % 90) + 10}`,
    date: new Date(Date.now() - (i * 86400000)).toISOString().slice(0,10)
  };
});

// =====================================================
// OFFERS (SAMPLE)
// NOTE: Renamed to OFFERS_SAMPLE to avoid colliding with the primary OFFERS export above.
// =====================================================
export const OFFERS_SAMPLE = [
  { id: 'OFF10', code: 'OFF10', title: '10% Off on First Order', discount: 10, description: 'Get 10% off on your first online order. Minimum cart ₹499', validTill: '2026-12-31', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop' },
  { id: 'BIRYANI50', code: 'BIRYANI50', title: '₹50 Off Biryani', discount: 50, description: 'Flat ₹50 off on any biryani. No min order.', validTill: '2026-11-30', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop' },
  { id: 'FAMILY20', code: 'FAMILY20', title: '20% Off Family Feast', discount: 20, description: '20% off on family meal combos. Valid on dine-in & takeaway.', validTill: '2026-12-15', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop' },
  { id: 'HAPPYHOUR', code: 'HAPPYHOUR', title: 'Buy 1 Get 1 (Drinks)', discount: 50, description: 'Buy one beverage, get one free between 4-6 PM.', validTill: '2026-10-31', image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&auto=format&fit=crop' },
  { id: 'WEEKEND30', code: 'WEEKEND30', title: '30% Off Weekend Brunch', discount: 30, description: 'Enjoy 30% off on our weekend brunch menu. Valid Sat-Sun.', validTill: '2026-12-31', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop' },
];


// =====================================================
// NOTIFICATIONS
// =====================================================

export const NOTIFICATIONS_DATA = [
  { id: 1, type: "order", title: "Order Confirmed!", message: "Your order #ORD-2024-003 has been confirmed and is being prepared.", time: "2 mins ago", read: false, icon: "🍽️" },
  { id: 2, type: "offer", title: "Weekend Special!", message: "Get 30% off this weekend. Use code WEEKEND30 at checkout.", time: "1 hour ago", read: false, icon: "🎉" },
  { id: 3, type: "reservation", title: "Reservation Confirmed", message: "Your table for 4 on Dec 20, 7:30 PM is confirmed.", time: "3 hours ago", read: true, icon: "📅" },
  { id: 4, type: "order", title: "Order Delivered!", message: "Your order #ORD-2024-001 has been delivered. Enjoy your meal!", time: "Yesterday", read: true, icon: "✅" },
  { id: 5, type: "system", title: "New Menu Items", message: "We've added 5 new items to our menu. Check them out!", time: "2 days ago", read: true, icon: "🆕" },
  { id: 6, type: "offer", title: "Points Earned", message: "You've earned 240 loyalty points from your last order.", time: "2 days ago", read: true, icon: "⭐" },
];

// =====================================================
// FAQ
// =====================================================

export const FAQ_DATA = [
  {
    id: 1, question: "What are your opening hours?", category: "General",
    answer: "We are open every day from 11:00 AM to 11:00 PM. On weekends (Friday-Sunday), we extend our hours till midnight."
  },
  {
    id: 2, question: "Do you accept online orders?", category: "Orders",
    answer: "Yes! You can order online through our website or app. We offer delivery within a 10km radius. Minimum order value is ₹300."
  },
  {
    id: 3, question: "How do I make a table reservation?", category: "Reservations",
    answer: "You can book a table through our website's 'Book a Table' section, call us at +91 98765 43210, or visit us in person."
  },
  {
    id: 4, question: "Do you have vegetarian options?", category: "Menu",
    answer: "Absolutely! We have an extensive vegetarian menu with over 40 items clearly marked with a green dot."
  },
  {
    id: 5, question: "Can I modify or cancel my order?", category: "Orders",
    answer: "You can modify or cancel your order within 5 minutes of placing it. After that, our kitchen team has already started preparing your meal."
  },
  {
    id: 6, question: "Do you offer catering services?", category: "General",
    answer: "Yes, we offer catering for events ranging from 20 to 500 guests. Please contact us at least 7 days in advance."
  },
  {
    id: 7, question: "What payment methods do you accept?", category: "Payment",
    answer: "We accept all major credit/debit cards, UPI (PhonePe, Google Pay, Paytm), net banking, and cash on delivery."
  },
  {
    id: 8, question: "Is there parking available?", category: "General",
    answer: "Yes, we have complimentary valet parking for our dine-in guests. Self-parking is also available nearby."
  },
];

export const USER_DATA = {
  id: "U001",
  name: "Arjun Sharma",
  email: "arjun.sharma@email.com",
  phone: "+91 98765 43210",
  avatar: null,
  address: "Flat 4B, Sea View Apartments, Bandra West, Mumbai - 400050",
  dob: "1992-08-15",
  gender: "Male",
  loyaltyPoints: 2840,
  tier: "Gold",
  joinDate: "2023-03-15",
};
