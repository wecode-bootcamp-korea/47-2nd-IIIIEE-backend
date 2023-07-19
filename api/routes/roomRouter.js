import express from 'express';
import { roomController } from '../controllers/index.js';

const roomRouter = express.Router();

roomRouter.get('/host/:userId', roomController.roomsByHost)
roomRouter.get('/categories/genders', roomController.genders)
roomRouter.get('/categories/ages', roomController.ages)
roomRouter.get('/categories/times', roomController.times)

export {roomRouter}