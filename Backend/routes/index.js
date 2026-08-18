import express from 'express';
import authRoutes from './auth.js';
import menuRoutes from './menu.js';
import ordersRoutes from './orders.js';
import reservationsRoutes from './reservations.js';
import tablesRoutes from './tables.js';
import inventoryRoutes from './inventory.js';
import reviewsRoutes from './reviews.js';
import dashboardRoutes from './dashboard.js';
import metaRoutes from './meta.js';
import offersRoutes from './offers.js';
import chefSpecialRoutes from './chefSpecials.js';
import usersRoutes from './users.js';
import notificationsRoutes from './notifications.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/menu', menuRoutes);
router.use('/orders', ordersRoutes);
router.use('/reservations', reservationsRoutes);
router.use('/tables', tablesRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/meta', metaRoutes);
router.use('/offers', offersRoutes);
router.use('/chef-specials', chefSpecialRoutes);
router.use('/notifications', notificationsRoutes);

export default router;
