import express from 'express';

const router = express.Router();

import { roomRouter } from './roomRouter.js';
import { userRouter } from './userRouter.js';

router.use('/rooms', roomRouter);
router.use('/users', userRouter);

export default router;
