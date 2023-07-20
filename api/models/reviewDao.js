import { dataSource } from './dataSource.js';

const createReview = async (userId, bodyInfo) => {
  try {
    const { hostId, content, room_id, rating } = bodyInfo;

    return await dataSource.query(
      `
            INSERT INTO host_reviews(host_id, guest_id, room_id, content, rating)
            VALUES (?,?,?,?,?)
            `,
      [hostId, userId, room_id, content, rating]
    );
  } catch (err) {
    const error = new Error('DATASOURCE_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const getHostReview = async (hostId) => {
  return await dataSource.query(
    `
      SELECT 
        hr.id,
        us.name,
        hr.content,
        FLOOR(hr.rating) rating
      FROM host_reviews hr
      JOIN users us ON hr.guest_id = us.id
      WHERE hr.host_id = ?
      `,
    [hostId]
  );
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
