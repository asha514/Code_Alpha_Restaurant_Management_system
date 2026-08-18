import express from 'express';
import auth from '../middleware/auth.js';
import * as tablesCtrl from '../controllers/tablesController.js';

const router = express.Router();

router.get('/', tablesCtrl.list);
router.get('/:id', tablesCtrl.get);
router.post('/', auth, tablesCtrl.create);
router.put('/:id', auth, tablesCtrl.update);
router.delete('/:id', auth, tablesCtrl.remove);

export default router;
