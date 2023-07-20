import { orderService } from '../services/index.js';
import { catchAsync } from '../utils/error.js';

const kakaoApprove = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const { tid, pgToken } = req.body;

  if (!tid) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  await orderService.kakaoApprove(userId, pgToken, tid);
  return res.status(200).json({ message: 'PAYMENT_SUCCESS' });
});

export default { kakaoApprove };
