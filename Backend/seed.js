
import fs from 'fs';
import path from 'path';
import url from 'url';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import 'dotenv/config';
import connectDB from './config/db.js';
import User from './models/User.js';
import MenuItem from './models/MenuItem.js';
import Table from './models/Table.js';
import Inventory from './models/Inventory.js';
import Reservation from './models/Reservation.js';
import Order from './models/Order.js';
import Review from './models/Review.js';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const findMockDataFile = () => {
  const candidates = [
    path.resolve(__dirname, '../src/data/mockData.js'),
    path.resolve(__dirname, '../src/mock/mockData.js'),
    path.resolve(__dirname, '../src/mockData.js')
  ];
  return candidates.find(p => fs.existsSync(p));
};

async function importMockData() {
  const mockPath = findMockDataFile();
  if (!mockPath) throw new Error('Could not locate mockData.js in src/data or src/mock');
  const moduleURL = url.pathToFileURL(mockPath).href;
  const mod = await import(moduleURL);
  return mod;
}

async function hashPassword(plain) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

async function main() {
  try {
    await connectDB();

    const mock = await importMockData();

    // Collections to clear
    console.log('Clearing existing collections...');
    await Promise.all([
      Review.deleteMany(),
      Order.deleteMany(),
      Reservation.deleteMany(),
      MenuItem.deleteMany(),
      Table.deleteMany(),
      Inventory.deleteMany(),
      User.deleteMany()
    ]);

    // Insert Menu Items (idempotent by name+price)
    const menuItemsMap = new Map(); // original id -> _id
    if (mock.MENU_ITEMS && Array.isArray(mock.MENU_ITEMS)) {
      for (const mi of mock.MENU_ITEMS) {
        const filter = { name: mi.name, price: mi.price };
        const update = {
          name: mi.name,
          description: mi.description,
          category: mi.category,
          price: mi.price,
          originalPrice: mi.originalPrice,
          image: mi.image,
          isVeg: mi.isVeg,
          isAvailable: mi.isAvailable,
          tags: mi.tags || [],
          prepTime: mi.prepTime,
          calories: typeof mi.calories === 'number' ? mi.calories : undefined,
          ingredients: mi.ingredients || []
        };
        const doc = await MenuItem.findOneAndUpdate(filter, update, { upsert: true, new: true, setDefaultsOnInsert: true });
        if (typeof mi.id !== 'undefined') menuItemsMap.set(mi.id, doc._id);
      }
      const count = await MenuItem.countDocuments();
      console.log(`Upserted ${count} menu items`);
    } else {
      console.log('No MENU_ITEMS found in mock data');
    }

    // Insert Tables (idempotent by number)
    const tablesMap = new Map(); // table id string -> _id
    if (mock.TABLES && Array.isArray(mock.TABLES)) {
      for (const t of mock.TABLES) {
        const filter = { number: t.number };
        const update = { number: t.number, capacity: t.capacity, status: t.status, section: t.section };
        const doc = await Table.findOneAndUpdate(filter, update, { upsert: true, new: true, setDefaultsOnInsert: true });
        if (t.id) tablesMap.set(t.id, doc._id);
      }
      const count = await Table.countDocuments();
      console.log(`Upserted ${count} tables`);
    } else {
      console.log('No TABLES found in mock data');
    }

    // Insert Inventory (idempotent by name)
    if (mock.INVENTORY && Array.isArray(mock.INVENTORY)) {
      for (const it of mock.INVENTORY) {
        const filter = { name: it.name };
        const update = { name: it.name, category: it.category, unit: it.unit, stock: it.stock, minStock: it.minStock, maxStock: it.maxStock, price: it.price, supplier: it.supplier, status: it.status };
        await Inventory.findOneAndUpdate(filter, update, { upsert: true, new: true, setDefaultsOnInsert: true });
      }
      const count = await Inventory.countDocuments();
      console.log(`Upserted ${count} inventory items`);
    } else {
      console.log('No INVENTORY found in mock data');
    }

    // Insert Users: CUSTOMERS, USER_DATA, EMPLOYEES — use upsert to skip duplicates
    const usersMapByEmail = new Map();
    const createdUsers = [];

    const defaultPassword = await hashPassword('Password@123');

    // helper to create user doc from arbitrary mock object
    const makeUserDoc = (obj, role = 'customer') => ({
      name: obj.name || obj.fullName || obj.username || 'Unknown',
      email: obj.email || `${(obj.name || 'user').toString().replace(/\s+/g,'').toLowerCase()}@example.com`,
      phone: obj.phone || obj.mobile || '',
      avatar: obj.avatar || obj.avatarUrl || null,
      password: defaultPassword,
      role
    });

    // customers
    if (mock.CUSTOMERS && Array.isArray(mock.CUSTOMERS)) {
      for (const c of mock.CUSTOMERS) {
        const doc = makeUserDoc(c, 'customer');
        const u = await User.findOneAndUpdate({ email: doc.email }, doc, { upsert: true, new: true, setDefaultsOnInsert: true });
        usersMapByEmail.set(u.email, u._id);
        createdUsers.push(u);
      }
      console.log(`Upserted ${mock.CUSTOMERS.length} customers as users`);
    }

    // single user
    if (mock.USER_DATA) {
      const doc = makeUserDoc(mock.USER_DATA, 'customer');
      const u = await User.findOneAndUpdate({ email: doc.email }, doc, { upsert: true, new: true, setDefaultsOnInsert: true });
      usersMapByEmail.set(u.email, u._id);
      createdUsers.push(u);
      console.log('Upserted USER_DATA as user');
    }

    // employees
    if (mock.EMPLOYEES && Array.isArray(mock.EMPLOYEES)) {
      for (const e of mock.EMPLOYEES) {
        const doc = makeUserDoc(e, 'staff');
        const u = await User.findOneAndUpdate({ email: doc.email }, doc, { upsert: true, new: true, setDefaultsOnInsert: true });
        usersMapByEmail.set(u.email, u._id);
        createdUsers.push(u);
      }
      console.log(`Upserted ${mock.EMPLOYEES.length} employees as users`);
    }

    // Insert Reservations
    if (mock.RESERVATIONS && Array.isArray(mock.RESERVATIONS)) {
      let resCount = 0;
      for (const r of mock.RESERVATIONS) {
        const tableId = r.tableId ? tablesMap.get(r.tableId) : undefined;
        const userId = r.email ? usersMapByEmail.get(r.email) : undefined;
        const doc = {
          name: r.name,
          user: userId || undefined,
          phone: r.phone,
          email: r.email,
          date: r.date,
          time: r.time,
          guests: r.guests,
          table: tableId || undefined,
          status: r.status,
          notes: r.notes,
          occasion: r.occasion
        };
        // use upsert by name+date+time to avoid duplicates
        await Reservation.findOneAndUpdate({ name: doc.name, date: doc.date, time: doc.time }, doc, { upsert: true, new: true, setDefaultsOnInsert: true });
        resCount++;
      }
      console.log(`Upserted ${resCount} reservations`);
    } else {
      console.log('No RESERVATIONS found in mock data');
    }

    // Insert Orders
    if (mock.ORDERS && Array.isArray(mock.ORDERS)) {
      let orderCount = 0;
      const fallbackUserId = createdUsers.length ? createdUsers[0]._id : undefined;
      for (const o of mock.ORDERS) {
        let userId = undefined;
        if (o.address && mock.USER_DATA && mock.USER_DATA.address && o.address === mock.USER_DATA.address) {
          userId = usersMapByEmail.get(mock.USER_DATA.email);
        }
        if (!userId && o.email) userId = usersMapByEmail.get(o.email);

        const items = [];
        for (const it of (o.items || [])) {
          let menuId = undefined;
          if (typeof it.id !== 'undefined') menuId = menuItemsMap.get(it.id);
          if (!menuId) {
            // try lookup by name+price
            const found = await MenuItem.findOne({ name: it.name, price: it.price });
            if (found) menuId = found._id;
          }
          items.push({ menuItem: menuId || undefined, name: it.name, price: it.price, quantity: it.quantity || 1 });
        }

        const doc = {
          user: userId || fallbackUserId,
          items,
          subtotal: o.subtotal,
          gst: o.gst,
          discount: o.discount,
          deliveryCharge: o.deliveryCharge,
          total: o.total,
          status: o.status || 'pending',
          address: o.address,
          paymentMethod: o.paymentMethod
        };
        // upsert by a stable order id if present, else insert new
        if (o.id) {
          await Order.findOneAndUpdate({ _id: o.id }, doc, { upsert: true, new: true, setDefaultsOnInsert: true }).catch(async () => {
            // if o.id is not a valid ObjectId, just create
            await Order.create(doc);
          });
        } else {
          await Order.create(doc);
        }
        orderCount++;
      }
      console.log(`Inserted ${orderCount} orders`);
    } else {
      console.log('No ORDERS found in mock data');
    }

    // Reviews / Testimonials -> Review model if menuItem mapping exists
    if (mock.TESTIMONIALS && Array.isArray(mock.TESTIMONIALS)) {
      // These are higher-level testimonials without menu item references — skip creating Review documents unless menuItem is present
      console.log('Skipping TESTIMONIALS (no matching Review model fields)');
    }

    // Final message
    console.log('\n✓ Database Seeded Successfully');

  } catch (err) {
    console.error('Seeding error:', err);
    process.exitCode = 1;
  } finally {
    try { await mongoose.disconnect(); } catch (e) {}
    process.exit();
  }
}

main();
