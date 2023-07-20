import { roomDao } from '../models/index.js';

const createRoom = async (roomposts) => {
  const { restaurantId, hostId, date, timeId } = roomposts;

  const existingRoom = await roomDao.checkExistingRoom(
    restaurantId,
    hostId,
    date,
    timeId
  );

  if (existingRoom.length > 0) {
    const error = new Error();
    error.message = 'EXISTED_DATA_INPUT';
    error.statusCode = 400;
    throw error;
  }

  try {
    return await roomDao.createRoom(roomposts);
  } catch (err) {
    const error = new Error();
    error.message = 'INVALID_DATA_INPUT';
    error.statusCode = 400;
    throw error;
  }
};

const roomsByHost = async (userId) => {
  return await roomDao.roomsByHost(userId);
};

const roomsByGuest = async (userId) => {
  return await roomDao.roomsByGuest(userId);
};

const roomsByMe = async (userId) => {
  return await roomDao.roomsByMe(userId);
};

const genders = async () => {
  return await roomDao.genders();
};

const ages = async () => {
  return await roomDao.ages();
};

const times = async () => {
  return await roomDao.times();
};

export default {
  roomsByGuest,
  createRoom,
  roomsByHost,
  roomsByMe,
  genders,
  ages,
  times,
};
