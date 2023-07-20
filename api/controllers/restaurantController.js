import { restaurantService } from '../services/index.js';
import { catchAsync } from '../utils/error.js';

const districts = catchAsync(async (req, res) => {
  const districts = await restaurantService.districts();
  return res.status(200).json({ data: districts });
});

export default {
  districts
};