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

const genders = catchAsync(async(req, res) => {
    const genders = await roomService.genders();
    return res.status(200).json({ data: genders });
});

const ages = catchAsync(async(req, res) => {
    const ages = await roomService.ages();
    return res.status(200).json({ data: ages });
});

const times = catchAsync(async(req, res) => {
    const times = await roomService.times();
    return res.status(200).json({ data: times });
});

 export default {
    roomsByHost,
    roomsByGuest,
    genders,
    ages,
    times
}