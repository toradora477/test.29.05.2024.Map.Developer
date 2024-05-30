import express, { Router } from 'express';
const router: Router = express.Router();

import markers from '../routes/markers';

router.use('/markers', markers);

export default router;
