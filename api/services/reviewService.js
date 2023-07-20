import { reviewDao } from '../models/index.js';

const createReview = async (userId, bodyInfo) => {
  return await reviewDao.createReview(userId, bodyInfo);
};

const getHostReview = async (hostId) => {
  const user = await reviewDao.userExistByHostId(hostId);

  if (!user) {
    const error = new Error('INVALID_USER');
    error.statusCode = 400;
    throw error;
  }

  return await reviewDao.getHostReview(hostId);
};

export default { createReview, getHostReview };
