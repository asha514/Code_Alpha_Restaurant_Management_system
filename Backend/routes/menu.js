import express from 'express';
import auth from '../middleware/auth.js';
import * as menuCtrl from '../controllers/menuController.js';

const router = express.Router();

router.get('/', menuCtrl.list);
router.get('/:id', menuCtrl.get);
router.post('/', auth, menuCtrl.create);
router.put('/:id', auth, menuCtrl.update);
router.delete('/:id', auth, menuCtrl.remove);

export default router;
