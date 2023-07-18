import express from 'express';
import { roomController } from '../controllers/index.js';

const roomRouter = express.Router();

roomRouter.get('/host/:userId', roomController.roomsByHost)

export {roomRouter}