import { dataSource } from './dataSource.js';

const getRoomList = async (conditionQuery) => {
  try {
    let conditionWhereQuery = [];
    const { type, district, Date, age, gender, limit=20, offset=0 } = conditionQuery;
 
    if (type) {
      let typeList = type.split(',');
      conditionWhereQuery.push(
        `restaurants.type IN (${typeList
          .map((type) => `'${type}'`)
          .join(', ')})`
      );
    }
    //해당 코드 참고해서 district mapping
    // const ageRange = Object.freeze({
    //   '20~29': 1,
    //   '30~39': 2,
    //   '40~49': 3,
    //   '50~59': 4,
    //   '60~69': 5,
    //   '70~79': 6,
    //   '80~89': 7,
    //   all: 8,
    //   unknown: 9,
    // });
    if (district) {
      let districtId = await queryRunner.query(
        `
              SELECT id
              FROM districts
              WHERE districts.name = ?
              `,
        [district]
      );
      districtId = districtId[0]['id'];
      conditionWhereQuery.push(`restaurants.district_id = ${district_id}`);
    }

    if (Date) {
      let [date, time] = Date.split('T');
      date =
        String(Number(date.split('-')[1])) +
        '/' +
        String(Number(date.split('-')[2]));
      time = time.split(':')[0] + ':' + time.split(':')[1];
      //date랑 time을 합치기
      conditionWhereQuery.push(`rooms.date = '${date}'`);
      conditionWhereQuery.push(`rooms.time = '${time}'`);
    }
    if (age) {
      let age_id = await queryRunner.query(
        `
              SELECT id
              FROM ages
              WHERE ages.age_range = ?
              `,
        [age]
      );
      age_id = age_id[0]['id'];
      conditionWhereQuery.push(`rooms.age_id = ${age_id}`);
    }
    if (gender) {
      let genderId = await queryRunner.query(
        `
              SELECT id 
              FROM genders
              WHERE genders.gender = ?
              `,
        [gender]
      );
      genderId = genderId[0]['id'];
      conditionWhereQuery.push(`rooms.gender_id = ${gender_id}`);
    }
    const totalConditionQuery = conditionWhereQuery.join(' AND ');

    const roomsQuery = `
              SELECT 
                restaurants.id as 'restaurantsId', 
                JSON_ARRAYGG(
                  JSON_OBJECT(
                    rooms.id as '방 id', 
                    rooms.title as '방 제목', 
                    rooms.content as '방 내용'
                  )
                )
              FROM restaurants
              JOIN rooms ON rooms.restaurant_id = restaurants.id
              WHERE ${totalConditionQuery}
              ORDER BY '식당 id' ASC;
              LIMIT ${} OFFSET ${}
          `;
 
    return roomsTransform;
  } catch (error) {
    throw error;
  }
};

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
        times.id AS timeId,
        times.hour,
        max_num AS maxNum, 
        ages.id AS ageId, 
        ages.age_range AS ageRange,
        genders.id AS genderId,
        genders.gender
      FROM rooms
      JOIN ages ON ages.id = age_id
      JOIN genders ON genders.id = gender_id
      JOIN times ON times.id = time_id
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

const roomsByGuest = async (userId) => {
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
        times.id AS timeId,
        times.hour,
        max_num AS maxNum, 
        ages.id AS ageId, 
        ages.age_range AS ageRange,
        genders.id AS genderId,
        genders.gender
      FROM rooms
      JOIN ages ON ages.id = age_id
      JOIN genders ON genders.id = gender_id
      JOIN restaurants ON restaurants.id = restaurant_id
      JOIN times ON times.id = time_id
      LEFT JOIN room_guests on room_guests.room_id = rooms.id
      WHERE room_guests.user_id = ?
        OR host_id = ?;
    `,
      [userId, userId]
    );
    return rooms;
  } catch {
    const error = new Error('DATASOURCE_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const ages = async () => {
  try {
    return await dataSource.query(
      `
      SELECT 
        id, 
        age_range
      FROM ages
      `
    );
  } catch {
    const error = new Error('DATASOURCE_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const genders = async () => {
  try {
    return await dataSource.query(
      `
      SELECT 
        id, 
        gender
      FROM genders
      `
    );
  } catch {
    const error = new Error('DATASOURCE_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const times = async () => {
  try {
    return await dataSource.query(
      `
      SELECT 
        id, 
        hour
      FROM times
      `
    );
  } catch {
    const error = new Error('DATASOURCE_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

export default {
  getRoomList,
  roomsByHost,
  roomsByGuest,
  ages,
  genders,
  times,
};
