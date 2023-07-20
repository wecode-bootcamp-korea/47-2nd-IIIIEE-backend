import { restaurantDao } from '../models/index.js';

const districts = async() => {
  return await restaurantDao.districts();
}

export default {
  districts
}