import { roomDao } from '../models/index.js';
import { ageRange, genderType, orderStatus } from '../enum/categories.js';

const createRoom = async (roomposts) => {
  const { restaurantId, hostId, date, timeId } = roomposts;

  const existingRoom = await roomDao.checkExistingRoom(restaurantId, hostId, date, timeId);

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

const joinRoom = async (roomId, user) => {
  const isInRoom = await roomDao.isInRoom(roomId, user.id);
  const room = await roomDao.getRoomInfo(roomId);

  if (isInRoom || room.hostId == user.id) {
    const error = new Error('USER_ALREADY_IN_ROOM');
    error.statusCode = 400;
    throw error;
  }

  if (parseInt(room.count) + 1 == room.maxNum) {
    const error = new Error('ROOM_FULL');
    error.statusCode = 400;
    throw error;
  }

  if (room.ageId < ageRange.all) {
    if (room.ageId != user.ageId) {
      const error = new Error('CANNOT_JOIN_ROOM');
      error.statusCode = 400;
      throw error;
    }
  }

  if (room.genderId < genderType.all) {
    if (room.genderId != user.genderId) {
      const error = new Error('CANNOT_JOIN_ROOM');
      error.statusCode = 400;
      throw error;
    }
  }

  await roomDao.addMember(roomId, user.id);

  if (parseInt(room.count) + 1 == room.maxNum - 1) {
    roomDao.changeStatus(roomId, orderStatus.FULL);
  }
};

const inquireHostbyRoomId = async (roomId) => {
  return await roomDao.inquireHostbyRoomId(roomId);
};

export default {
  roomsByGuest,
  createRoom,
  roomsByHost,
  roomsByMe,
  genders,
  ages,
  times,
  joinRoom,
  inquireHostbyRoomId,
};
