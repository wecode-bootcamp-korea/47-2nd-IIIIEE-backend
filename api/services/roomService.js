import { roomDao } from '../models/index.js';

const roomsByHost = async(userId) => {
  return await roomDao.roomsByHost(userId);
}

const roomsByGuest = async(userId) => {
  return await roomDao.roomsByGuest(userId);
}

export default {
  roomsByHost,
  roomsByGuest
}