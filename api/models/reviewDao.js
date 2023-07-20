import { dataSource } from './dataSource.js';
const isInReview = async (userId, bodyInfo) => {
  const { hostId, roomId } = bodyInfo;

  const isInQuery = await dataSource.query(
    `
          SELECT * from host_reviews
          where host_id = ?  and
          guest_id = ? and 
          room_id = ?
          `,
    [hostId, userId, roomId]
  );
  return await isInQuery;
};
const checkExistRoom = async (userId, bodyInfo) => {
  const { roomId } = bodyInfo;
  const isExistRoomQuery = dataSource.query(
    `
      SELECT room_id from room_guests
      WHERE user_id = ? and
     room_id = ?
    `,
    [userId, roomId]
  );
  const roomArray = await isExistRoomQuery;
  return roomArray;
};
const returnHostId = async (roomId) => {
  const HostId = await dataSource.query(
    `
    select host_id from rooms
    where id = ?
    `,
    [roomId[0]['room_id']]
  );
  return HostId[0]['host_id'];
};
const createReview = async (userId, bodyInfo) => {
  const { hostId, content, roomId, rating } = bodyInfo;

  if ((await isInReview(userId, bodyInfo)) == []) {
    const error = new Error('이미 댓글이 존재합니다');
    error.statusCode = 400;
    throw error;
  }
  const returnRoomId = await checkExistRoom(userId, bodyInfo);
  const HostId = await returnHostId(returnRoomId);
  if (HostId != hostId) {
    const error = new Error('해당 유저와 밥을 먹은 적이 없습니다');
    error.statusCode = 400;
    throw error;
  }
  try {
    return await dataSource.query(
      `
        INSERT INTO host_reviews(host_id, guest_id, room_id, content, rating)
         VALUES (?,?,?,?,?)
      `,
      [hostId, userId, roomId, content, rating]
    );
  } catch (err) {
    const error = new Error('DATASOURCE_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const getHostReview = async (hostId) => {
  try {
    return await dataSource.query(
      `
      SELECT 
        hr.id,
        uh.name hostName,
        us.name guestName,
        hr.content,
        FLOOR(hr.rating) rating
      FROM host_reviews hr
      JOIN users us ON hr.guest_id = us.id
      JOIN users uh ON hr.host_id = uh.id
      WHERE hr.host_id = ?
      `,
      [hostId]
    );
  } catch (err) {
    throw err;
  }
};

const userExistByHostId = async (hostId) => {
  const [userExist] = await dataSource.query(
    `
    SELECT EXISTS (
      SELECT id
      FROM users
      WHERE users.id = ?
    ) exist
  `,
    [hostId]
  );

  return !!parseInt(userExist.exist);
};

export default { createReview, getHostReview, userExistByHostId };
