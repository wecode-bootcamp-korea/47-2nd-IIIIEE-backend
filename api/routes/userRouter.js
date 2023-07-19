import express from 'express';
import { userController } from '../controllers/index.js';

const userRouter = express.Router();

userRouter.post('/kakaoLogin', userController.kakaoLogin);

export { userRouter };
