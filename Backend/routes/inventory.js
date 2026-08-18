import express from 'express';
import auth from '../middleware/auth.js';
import * as invCtrl from '../controllers/inventoryController.js';

const router = express.Router();

router.get('/', invCtrl.list);
router.get('/:id', invCtrl.get);
router.post('/', auth, invCtrl.create);
router.put('/:id', auth, invCtrl.update);
router.delete('/:id', auth, invCtrl.remove);

export default router;
