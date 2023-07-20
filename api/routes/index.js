import express from 'express';

const router = express.Router();

import { roomRouter } from './roomRouter.js';
import { userRouter } from './userRouter.js';
import { restaurantRouter } from './restaurantRouter.js';
import { reviewRouter } from './reviewRouter.js';

router.use('/rooms', roomRouter);
router.use('/users', userRouter);
router.use('/restaurants', restaurantRouter);
router.use('/reviews', reviewRouter);

export default router;
