import { dataSource } from './dataSource.js';

const districts = async() => {
  try {
    return await dataSource.query(
      `
      SELECT 
        id, 
        name
      FROM districts
      `
    )
  } catch {
    const error = new Error('DATASOURCE_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

export default {
  districts
}