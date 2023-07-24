import jwt from 'jsonwebtoken';
import axios from 'axios';

import { userDao } from '../models/index.js';

const kakaoLogin = async (kakaoCode) => {
  const clientId = process.env.CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI;

  const kakaoToken = await axios({
    method: 'POST',
    url: 'https://kauth.kakao.com/oauth/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    data: {
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: redirectUri,
      code: kakaoCode,
    },
  });

  const result = await axios({
    method: 'GET',
    url: 'https://kapi.kakao.com/v2/user/me',
    headers: {
      Authorization: `Bearer ${kakaoToken.data.access_token}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });

  const {
    id: kakaoId,
    properties: { nickname: name, profile_image: profileImage },
    kakao_account: { email: email, age_range: age, gender: gender },
  } = result.data;

  const ageRange = Object.freeze({
    '20~29': 1,
    '30~39': 2,
    '40~49': 3,
    '50~59': 4,
    '60~69': 5,
    '70~79': 6,
    '80~89': 7,
    all: 8,
    unknown: 9,
  });

  const genderType = Object.freeze({
    male: 1,
    female: 2,
    all: 3,
    unknown: 4,
  });

  const ageId = ageRange[age] || 9;
  const genderId = genderType[gender] || 4;

  const userExist = await userDao.userExistByKakaoId(kakaoId);

  if (!userExist) {
    await userDao.createUser(
      kakaoId,
      name,
      email,
      ageId,
      genderId,
      profileImage
    );
  }

  const user = await userDao.getUserIdByKakaoId(kakaoId);

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  return { accessToken: accessToken };
};

export default { kakaoLogin };
