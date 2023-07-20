import express from 'express';
import { roomCheckData } from '../controllers/index.js';

const roomCheckRouter = express.Router();
roomCheckRouter.get('', roomCheckData);

export { roomCheckRouter };
