import { restaurantService } from "../services/index.js";
import { catchAsync } from "../utils/error.js";

const districts = catchAsync(async (req, res) => {
  const districts = await restaurantService.districts();
  return res.status(200).json({ data: districts });
});

const getRestaurantInfo = catchAsync(async (req, res) => {
  const { restaurantId } = req.params;

  if (!restaurantId) {
<<<<<<< HEAD
    const error = new Error('KEY_ERROR');
=======
    const error = new Error("KEY_ERROR");
>>>>>>> 179d139 (Modify: 로그인 된 유저가 호스트인 방 뺴고 유저가 신청한 방 조회하기)
    error.statusCode = 400;

    throw error;
  }

<<<<<<< HEAD
  const getRestaurantInfo = await restaurantService.getRestaurantInfo(restaurantId);
=======
  const getRestaurantInfo = await restaurantService.getRestaurantInfo(
    restaurantId
  );
>>>>>>> 179d139 (Modify: 로그인 된 유저가 호스트인 방 뺴고 유저가 신청한 방 조회하기)

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
