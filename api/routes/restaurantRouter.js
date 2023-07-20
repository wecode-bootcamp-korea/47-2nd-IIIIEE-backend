import express from 'express';
import { restaurantController } from '../controllers/index.js';

const restaurantRouter = express.Router();

restaurantRouter.get('/categories/districts', restaurantController.districts);
restaurantRouter.get(
  '/info/:restaurantId',
  restaurantController.getRestaurantInfo
);
restaurantRouter.get('/restaurantList', restaurantController.restaurantList);
restaurantRouter.get('/categories/districts', restaurantController.districts);
restaurantRouter.get('/:restaurantId', restaurantController.getRestaurantInfo);
export { restaurantRouter };
