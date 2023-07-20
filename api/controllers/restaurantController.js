import { restaurantService } from '../services/index.js';
import { catchAsync } from '../utils/error.js';

const districts = catchAsync(async (req, res) => {
  const districts = await restaurantService.districts();
  return res.status(200).json({ data: districts });
});

const getRestaurantInfo = catchAsync(async (req, res) => {
  const { restaurantId } = req.params;
  if (!restaurantId) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;

    throw error;
  }

  const getRestaurantInfo = await restaurantService.getRestaurantInfo(restaurantId);

  return res.status(200).json({ data: getRestaurantInfo });
});

const restaurantList = catchAsync(async (req, res) => {
  const restaurantList = await restaurantService.getRestaurantList(req.query);
  res.status(200).json({ data: restaurantList });
});

export default {
  districts,
  restaurantList,
  getRestaurantInfo,
};
