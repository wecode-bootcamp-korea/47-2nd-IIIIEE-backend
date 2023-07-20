import express from 'express';
import { restaurantController } from '../controllers/index.js';

const restaurantRouter = express.Router();

restaurantRouter.get('/categories/districts', restaurantController.districts);
restaurantRouter.get('/info/:restaurantId', restaurantController.getRestaurantInfo);
restaurantRouter.get('/restaurantList', restaurantController.restaurantList);

export { restaurantRouter };
