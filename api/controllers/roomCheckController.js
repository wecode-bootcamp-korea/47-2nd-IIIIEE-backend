import { getRoomList } from '../services/index.js';
import { catchAsync } from '../utils/error.js';

const roomList = catchAsync(async (req, res, next) => {
  const roomList = await getRoomList(req.query);
  res.status(200).json({ data: roomList });
});

export { roomList };
