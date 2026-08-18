import express from 'express';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import * as specialsCtrl from '../controllers/chefSpecialController.js';

const router = express.Router();

router.get('/', specialsCtrl.list);
router.get('/today', specialsCtrl.today);
router.get('/:id', specialsCtrl.get);
router.post('/', auth, admin, specialsCtrl.create);
router.put('/:id', auth, admin, specialsCtrl.update);
router.delete('/:id', auth, admin, specialsCtrl.remove);

export default router;
