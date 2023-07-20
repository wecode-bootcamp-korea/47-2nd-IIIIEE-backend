import { dataSource } from "./dataSource.js";

const districts = async () => {
  try {
    return await dataSource.query(
      `
      SELECT 
        id, 
        name
      FROM districts
      `
    );
  } catch {
    const error = new Error("DATASOURCE_ERROR");
    error.statusCode = 400;
    throw error;
  }
};
const getRestaurantList = async (conditionQuery) => {
  try {
    let conditionRoomsQuery = [];
    let conditionRestaurantQuery = [];
    const {
      district,
      date,
      time,
      age,
      gender,
      limit = 3,
      offset = 0,
    } = conditionQuery;
    if (district) {
      conditionRestaurantQuery.push(`restaurants.district_id = ${district}`);
    }
    if (date) {
      conditionRoomsQuery.push(`rooms.date = '${date.substring(0, 10)}'`);
    }
    if (age) {
      conditionRoomsQuery.push(`rooms.age_id = ${age}`);
    }
    if (time) {
      conditionRoomsQuery.push(`rooms.time_id = ${time}`);
    }
    if (gender) {
      conditionRoomsQuery.push(`rooms.gender_id = ${gender}`);
    }
    const totalConditionQuery = conditionRoomsQuery.join(" AND ");
    const roomsQuery = `
      SELECT rooms.restaurant_id AS 'restaurantId',
      rooms.id AS 'roomsId',
      rooms.title AS 'roomsTitle'
      FROM rooms
      JOIN restaurants ON restaurants.id = rooms.restaurant_id
      WHERE ${totalConditionQuery}
      AND ${conditionRestaurantQuery}
    `;
    const restaurantsQuery = `
      SELECT restaurants.id AS 'restaurantId',
      restaurants.name AS 'restaurantName',
      restaurant_images.image AS 'restaurantImage'
      FROM restaurants
      JOIN restaurant_images ON restaurant_images.restaurant_id = restaurants.id
      WHERE ${conditionRestaurantQuery}
      `;
    const roomsData = await dataSource.query(roomsQuery);
    let restaurantsData = {};
    restaurantsData = await dataSource.query(restaurantsQuery);
    let roomsIndex = 0;
    for (let restaurantsIndex in roomsData) {
      let roomsDataQuery = [];
      let limitIndex = 0;
      while (
        limitIndex < limit &&
        roomsIndex < roomsData.length &&
        restaurantsData[restaurantsIndex] &&
        roomsData[roomsIndex]["restaurantId"] ===
          restaurantsData[restaurantsIndex]["restaurantId"]
      ) {
        limitIndex += 1;
        roomsDataQuery.push(
          `{'roomsId' = '${roomsData[roomsIndex]["roomsId"]}','roomsTitle' = '${roomsData[roomsIndex]["roomsTitle"]}'}`
        );
        roomsIndex += 1;
      }
      let roomsTotalQuery = roomsDataQuery.join("");
      if (roomsTotalQuery) {
        restaurantsData[restaurantsIndex]["roomsData"] = roomsTotalQuery;
      }
    }
    return restaurantsData;
  } catch (error) {
    throw error;
  }
};
const getRestaurantInfo = async (restaurantId) => {
  const [restaurantInfo] = await dataSource.query(
    `
      SELECT 
        re.id restaurantId,
        re.name,
        re.district_id districtId,
        re.type,
        re.rating star,
        re.location_x x,
        re.location_y y,
        re.description,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', ri.id,
            'image', ri.image
          )
        ) images
      FROM restaurants re
      JOIN restaurant_images ri ON re.id = ri.restaurant_id
      WHERE re.id = ?
      `,
    [restaurantId]
  );

  return restaurantInfo;
};

export default {
  districts,
  getRestaurantList,
  getRestaurantInfo,
};
