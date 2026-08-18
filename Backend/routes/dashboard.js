import express from 'express';
import * as dashboardCtrl from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/stats', dashboardCtrl.stats);
router.get('/reports', dashboardCtrl.reports);

export default router;
