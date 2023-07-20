import { roomDao } from '../models/index.js';

const roomsByHost = async(userId) => {
  return await roomDao.roomsByHost(userId);
}

const roomsByGuest = async(userId) => {
  return await roomDao.roomsByGuest(userId);
}

const roomsByMe = async(userId) => {
  return await roomDao.roomsByMe(userId);
}

const genders = async() => {
  return await roomDao.genders();
}

const ages = async() => {
  return await roomDao.ages();
}

const times = async() => {
  return await roomDao.times();
}

export default {
  roomsByGuest,
  roomsByHost,
  roomsByMe,
  genders,
  ages,
  times
}