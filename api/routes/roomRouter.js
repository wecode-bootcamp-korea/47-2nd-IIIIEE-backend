import express from 'express';
import { roomController } from '../controllers/index.js';
import { loginRequired } from '../utils/auth.js';

const roomRouter = express.Router();

roomRouter.post('', loginRequired, roomController.createRoom);
roomRouter.get('/host', loginRequired, roomController.roomsByMe);
roomRouter.get('/host/:userId', roomController.roomsByHost);
roomRouter.get('/member', loginRequired, roomController.roomsByGuest);
roomRouter.get('/categories/genders', roomController.genders);
roomRouter.get('/categories/ages', roomController.ages);
roomRouter.get('/categories/times', roomController.times);
roomRouter.get('/info/:roomId', loginRequired, roomController.inquireHostbyRoomId);
roomRouter.post('/:roomId/joinRoom', loginRequired, roomController.joinRoom);

export { roomRouter };
