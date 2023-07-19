import { userService } from '../services/index.js';
import { catchAsync } from '../utils/error.js';

const kakaoLogin = catchAsync(async (req, res) => {
  const kakaoCode = req.query.code;

  const accessToken = await userService.kakaoLogin(kakaoCode);

  return res.status(200).json({ accessToken: accessToken });
});

export default { kakaoLogin };
