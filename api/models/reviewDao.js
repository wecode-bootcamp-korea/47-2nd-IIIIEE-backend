import { dataSource } from "./dataSource.js";

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
    const error = new Error("DATASOURCE_ERROR");
    error.statusCode = 400;
    throw error;
  }
};

export default {
  createReview,
};
