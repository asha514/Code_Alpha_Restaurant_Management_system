import express from 'express';
import auth from '../middleware/auth.js';
import * as ordersCtrl from '../controllers/ordersController.js';

const router = express.Router();

router.get('/', auth, ordersCtrl.list);
router.get('/:id', auth, ordersCtrl.get);
router.post('/', auth, ordersCtrl.create);
router.put('/:id', auth, ordersCtrl.update);
router.delete('/:id', auth, ordersCtrl.remove);

export default router;
