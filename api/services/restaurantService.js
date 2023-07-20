import { restaurantDao } from '../models/index.js';

const districts = async () => {
  return await restaurantDao.districts();
};

const getRestaurantInfo = async (restaurantId) => {
  const restaurant = await restaurantDao.getRestaurantInfo(restaurantId);

  const existRestaurant = restaurant.restaurantId;

  if (existRestaurant === null) {
    const error = new Error('INVALID_RESTAURANT_ID');
    error.statusCode = 404;

    throw error;
  }

  return restaurant;
};
const getQuery = (beforeQuery) => {
  let conditionRoomsQuery = [];
  let conditionRestaurantQuery = [];
  const { district, date, time, age, gender } = beforeQuery;
  if (district) {
    conditionRestaurantQuery.push(`restaurants.district_id = ${district}`);
  }
  if (date) {
    conditionRoomsQuery.push(`rooms.date = '${date}'`);
  }
  if (age && age != 8) {
    conditionRoomsQuery.push(`rooms.age_id = ${age}`);
  }
  if (time) {
    conditionRoomsQuery.push(`rooms.time_id = ${time}`);
  }
  if (gender && gender != 3) {
    conditionRoomsQuery.push(`rooms.gender_id = ${gender}`);
  }

  const totalConditionQuery = String(conditionRoomsQuery.join(' AND '));
  conditionRestaurantQuery = String(conditionRestaurantQuery);
  let roomsQuery;
  let restaurantsQuery;
  if (totalConditionQuery && conditionRestaurantQuery) {
    roomsQuery = `
        SELECT rooms.restaurant_id AS 'restaurantId',
        rooms.id AS 'roomsId',
        rooms.title AS 'roomsTitle'
        FROM rooms
        JOIN restaurants ON restaurants.id = rooms.restaurant_id
        WHERE ${totalConditionQuery}
        AND ${conditionRestaurantQuery}
      `;
    restaurantsQuery = `
      SELECT restaurants.id AS 'restaurantId',
      restaurants.name AS 'restaurantName',
      GROUP_CONCAT(restaurant_images.image) AS 'restaurantImage'
      FROM restaurants
      JOIN restaurant_images ON restaurant_images.restaurant_id = restaurants.id
      WHERE ${conditionRestaurantQuery}
      GROUP BY restaurants.id, restaurants.name;

      `;
  } else if (totalConditionQuery) {
    roomsQuery = `
      SELECT rooms.restaurant_id AS 'restaurantId',
      rooms.id AS 'roomsId',
      rooms.title AS 'roomsTitle'
      FROM rooms
      JOIN restaurants ON restaurants.id = rooms.restaurant_id
      WHERE ${totalConditionQuery}
    `;
    restaurantsQuery = `
      SELECT restaurants.id AS 'restaurantId',

      restaurants.name AS 'restaurantName',
      GROUP_CONCAT(restaurant_images.image) AS 'restaurantImage'
      FROM restaurants
      JOIN restaurant_images ON restaurant_images.restaurant_id = restaurants.id
      GROUP BY restaurants.id, restaurants.name;

      `;
  } else if (conditionRestaurantQuery) {
    roomsQuery = `
        SELECT rooms.restaurant_id AS 'restaurantId',
        rooms.id AS 'roomsId',
        rooms.title AS 'roomsTitle'
        FROM rooms
        JOIN restaurants ON restaurants.id = rooms.restaurant_id
        AND ${conditionRestaurantQuery}
      `;
    restaurantsQuery = `
      SELECT restaurants.id AS 'restaurantId',
      restaurants.name AS 'restaurantName',
      GROUP_CONCAT(restaurant_images.image) AS 'restaurantImage'
      FROM restaurants
      JOIN restaurant_images ON restaurant_images.restaurant_id = restaurants.id
      WHERE ${conditionRestaurantQuery}
      GROUP BY restaurants.id, restaurants.name;

      `;
  }
  return [roomsQuery, restaurantsQuery];
};
const getRestaurantList = async (conditionQuery) => {
  const { limit = 3, offset = 0 } = conditionQuery;
  const [roomsQuery, restaurantsQuery] = getQuery(conditionQuery);
  return await restaurantDao.getRestaurantList(roomsQuery, restaurantsQuery, limit, offset);
};
export default {
  districts,
  getRestaurantList,
  getRestaurantInfo,
};
