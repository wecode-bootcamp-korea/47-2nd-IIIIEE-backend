import express from 'express';
import { restaurantController } from '../controllers/index.js';

const restaurantRouter = express.Router();

restaurantRouter.get('/categories/districts', restaurantController.districts);

export { restaurantRouter };