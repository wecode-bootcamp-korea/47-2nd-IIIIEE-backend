import { userService } from '../services/index.js';
import { catchAsync } from '../utils/error.js';

const kakaoLogin = catchAsync(async (req, res) => {
  const kakaoToken = req.headers.authorization;

  const accessToken = await userService.kakaoLogin(kakaoToken);

  return res.status(200).json({ accessToken: accessToken });
});

export default { kakaoLogin };
