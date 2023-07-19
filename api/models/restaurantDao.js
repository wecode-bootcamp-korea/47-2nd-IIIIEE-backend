import { dataSource } from './dataSource.js';

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
    const error = new Error('DATASOURCE_ERROR');
    error.statusCode = 400;
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

export default { districts, getRestaurantInfo };
