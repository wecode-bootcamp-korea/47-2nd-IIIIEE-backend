import { restaurantDao } from '../models/index.js';

const districts = async () => {
  return await restaurantDao.districts();
};

const getRestaurantInfo = async (restaurantId) => {
  const restaurant = await restaurantDao.getRestaurantInfo(restaurantId);

  const existRestaurant = restaurant.restaurantId;

  if (existRestaurant === null) {
    const error = new Error('INVALID_RESTAURANT_ID');
    error.statusCode = 404;

    throw error;
  }

  return restaurant;
};

export default { districts, getRestaurantInfo };
