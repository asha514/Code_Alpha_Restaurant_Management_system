import express from 'express';
import auth from '../middleware/auth.js';
import * as reviewsCtrl from '../controllers/reviewsController.js';

const router = express.Router();

router.get('/', reviewsCtrl.list);
router.post('/', auth, reviewsCtrl.create);
router.put('/:id', auth, reviewsCtrl.update);
router.delete('/:id', auth, reviewsCtrl.remove);

export default router;
