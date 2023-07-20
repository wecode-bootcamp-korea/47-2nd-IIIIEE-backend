import { reviewDao } from '../models/index.js';
import toxicity from '@tensorflow-models/toxicity';
import axios from 'axios';

const koToEn = async (text) => {
  const params = new URLSearchParams({
    source: 'ko',
    target: 'en',
    text: text,
  }).toString();
  const naverId = process.env.XNaverClient_Id;
  const naverSecret = process.env.XNaverClient_Secret;
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Naver-Client-Id': naverId,
    'X-Naver-Client-Secret': naverSecret,
  };
  try {
    const response = await axios.post(
      'https://openapi.naver.com/v1/papago/n2mt',
      params,
      { headers }
    );
    return response.data.message.result;
  } catch (error) {
    const err = new Error('translation failed');
    err.statusCode = 400;
    throw err;
  }
};
const reviewFilter = async (sentences) => {
  const threshold = 0.9;
  const model = await toxicity.load(threshold);
  const predictions = await model.classify(sentences.translatedText);
  for (let index in predictions) {
    if (predictions[index].results[0].match === true) {
      return true;
    }
  }
  return false;
};

const createReview = async (userId, bodyInfo) => {
  const { content } = bodyInfo;
  const contentByEn = await koToEn(content);
  let isToxic = await reviewFilter(contentByEn);
  if (isToxic) {
    const error = new Error('해당 댓글은 악플입니다.');
    error.statusCode = 400;
    throw error;
  }
  return await reviewDao.createReview(userId, bodyInfo);
};

const getHostReview = async (hostId) => {
  const user = await reviewDao.userExistByHostId(hostId);

  if (!user) {
    const error = new Error('INVALID_USER');
    error.statusCode = 400;
    throw error;
  }
  return await reviewDao.getHostReview(hostId);
};

export default { createReview, getHostReview };
