import express from 'express';
import { orderController } from '../controllers/index.js';
import { loginRequired } from '../utils/auth.js';

const orderRouter = express.Router();
orderRouter.post('/approve', loginRequired, orderController.kakaoApprove);

export { orderRouter };
