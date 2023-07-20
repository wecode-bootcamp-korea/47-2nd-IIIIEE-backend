import { roomDao } from '../models/index.js';

const getRoomList = async (conditionQuery) => {
  try {
    return await roomDao.getRoomList(conditionQuery);
  } catch (error) {
    throw error;
  }
};

export { getRoomList };
