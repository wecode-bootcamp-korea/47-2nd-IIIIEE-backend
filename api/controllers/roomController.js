import { roomService } from '../services/index.js';
import { catchAsync } from '../utils/error.js';

const roomsByHost = catchAsync(async(req, res) => {
    const userId = req.params.userId

    if (!userId) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
    }
    
    const rooms = await roomService.roomsByHost(userId);
    return res.status(200).json({ data: rooms });
 });

 const roomsByGuest = catchAsync(async(req, res) => {
    const userId = req.user.id
    
    const rooms = await roomService.roomsByGuest(userId);
    return res.status(200).json({ data: rooms });
 });

 export default {roomsByHost, roomsByGuest}