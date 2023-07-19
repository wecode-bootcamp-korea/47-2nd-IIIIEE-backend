import { dataSource } from './dataSource.js';

const createUser = async (kakaoId, name, email, ageId, genderId, profileImage) => {
  return await dataSource.query(
    `
      INSERT INTO users(
        kakao_id,
        name,
        email,
        age_id,
        gender_id,
        profile_image
      ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      );
      `,
    [kakaoId, name, email, ageId, genderId, profileImage]
  );
};

const getUserById = async (id) => {
  const [user] = await dataSource.query(
    `
    SELECT
      id,
      email,
      password,
      name,
      phone_number phoneNumber
    FROM users
    WHERE id = ?
  `,
    [id]
  );

  return user;
};

const userExistByKakaoId = async (kakaoId) => {
  const [userExist] = await dataSource.query(
    `
    SELECT EXISTS (
      SELECT *
      FROM users
      WHERE kakao_id = ?
    ) exist
  `,
    [kakaoId]
  );

  return !!parseInt(userExist.exist);
};

const getUserIdByKakaoId = async (kakaoId) => {
  const [user] = await dataSource.query(
    `
    SELECT *
    FROM users
    WHERE kakao_id = ?
  `,
    [kakaoId]
  );

  return user;
};
export default { createUser, getUserById, userExistByKakaoId, getUserIdByKakaoId };
