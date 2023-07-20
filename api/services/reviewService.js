import { reviewDao } from "../models/index.js";

const createReview = async (userId, bodyInfo) => {
  return await reviewDao.createReview(userId, bodyInfo);
};

export default {
  createReview,
};
