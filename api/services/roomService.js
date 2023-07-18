import { roomDao } from '../models/index.js';

const roomsByHost = async(userId) => {
  return await roomDao.roomsByHost(userId);
}

export default {
  roomsByHost
}