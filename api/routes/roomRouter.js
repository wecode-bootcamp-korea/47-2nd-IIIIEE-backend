import express from 'express';
import { roomController } from '../controllers/index.js';
import { loginRequired } from '../utils/auth.js';

const roomRouter = express.Router();

roomRouter.post('', loginRequired, roomController.createRoom);
roomRouter.get('/host', loginRequired, roomController.roomsByMe);
roomRouter.get('/host/:userId', loginRequired, roomController.roomsByHost);
roomRouter.get('/member', roomController.roomsByGuest);
roomRouter.get('/categories/genders', roomController.genders);
roomRouter.get('/categories/ages', roomController.ages);
roomRouter.get('/categories/times', roomController.times);

export { roomRouter };
