import express from 'express';
import { roomController } from '../controllers/index.js';

const roomRouter = express.Router();

roomRouter.get('/host/:userId', roomController.roomsByHost)
roomRouter.get('/saved', loginRequired, roomController.roomsByGuest)

export {roomRouter}