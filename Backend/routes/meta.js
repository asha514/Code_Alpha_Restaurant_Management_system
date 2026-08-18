import express from 'express';
import * as metaCtrl from '../controllers/metaController.js';

const router = express.Router();

router.get('/site', metaCtrl.site);

export default router;
