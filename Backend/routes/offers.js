import express from 'express';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import * as offersCtrl from '../controllers/offersController.js';

const router = express.Router();

router.get('/', offersCtrl.list);
router.get('/active', offersCtrl.active);
router.get('/:id', offersCtrl.get);
router.post('/', auth, admin, offersCtrl.create);
router.put('/:id', auth, admin, offersCtrl.update);
router.delete('/:id', auth, admin, offersCtrl.remove);

export default router;
