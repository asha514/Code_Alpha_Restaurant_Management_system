import express from 'express';
import auth from '../middleware/auth.js';
import * as usersCtrl from '../controllers/usersController.js';

const router = express.Router();

router.get('/', auth, usersCtrl.list);
router.get('/:id', auth, usersCtrl.get);
router.put('/:id', auth, usersCtrl.update);
router.delete('/:id', auth, usersCtrl.remove);

export default router;
