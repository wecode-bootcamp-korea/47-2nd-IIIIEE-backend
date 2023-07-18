import { dataSource } from './dataSource.js';

const roomsByHost = async (userId) => {
  try {
    const rooms = await dataSource.query(
      `
      SELECT 
        rooms.id AS roomId,
        restaurants.id AS restaurantId, 
        restaurants.name AS restaurantName,
        host_id AS hostId, 
        rooms.image, 
        date, 
        time, 
        max_num AS maxNum, 
        ages.id AS ageId, 
        ages.age_range AS ageRange,
        genders.id AS genderId,
        genders.gender
      FROM rooms
      JOIN ages ON ages.id = age_id
      JOIN genders ON genders.id = gender_id
      JOIN restaurants ON restaurants.id = restaurant_id
      WHERE host_id = ?;
    `,
      [userId]
    );
    return rooms;
  } catch {
    const error = new Error('DATASOURCE_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

export default {
  roomsByHost
}