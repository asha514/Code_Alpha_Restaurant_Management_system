import express from 'express';
import auth from '../middleware/auth.js';
import * as reservationsCtrl from '../controllers/reservationsController.js';

const router = express.Router();

router.get('/', auth, reservationsCtrl.list);
router.get('/:id', auth, reservationsCtrl.get);
router.post('/', auth, reservationsCtrl.create);
router.put('/:id', auth, reservationsCtrl.update);
router.delete('/:id', auth, reservationsCtrl.remove);

export default router;
