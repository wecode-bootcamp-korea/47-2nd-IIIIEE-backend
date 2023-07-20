import { roomService } from '../services/index.js';
import { catchAsync } from '../utils/error.js';

const createRoom = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const roomId = await roomService.createRoom(req.body, userId);
  return res.status(201).json({ data: roomId });
});

const roomsByHost = catchAsync(async (req, res) => {
  const userId = req.params.userId || 1;
  const loggedId = req.user.id;

  if (!userId) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const rooms = await roomService.roomsByHost(userId);
  return res.status(200).json({ data: rooms, loggedId: loggedId });
});

const roomsByGuest = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const rooms = await roomService.roomsByGuest(userId);
  return res.status(200).json({ data: rooms });
});

const roomsByMe = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const rooms = await roomService.roomsByMe(userId);
  return res.status(200).json({ data: rooms });
});

const genders = catchAsync(async (req, res) => {
  const genders = await roomService.genders();
  return res.status(200).json({ data: genders });
});

const ages = catchAsync(async (req, res) => {
  const ages = await roomService.ages();
  return res.status(200).json({ data: ages });
});

const times = catchAsync(async (req, res) => {
  const times = await roomService.times();
  return res.status(200).json({ data: times });
});

const uploadRoomImage = catchAsync(async (req, res) => {
  try {
    const roomId = req.body.roomId;
    const image = req.file.location;

    if (!roomId) {
      return res.status(400).json({ message: 'CANT_FIND_ROOM' });
    }

    await roomService.uploadImage(roomId, image);

    return res.status(200).json({ message: 'IMAGE_UPLOAD_SUCCESS' });
  } catch (err) {
    res.status(400).json({
      message: 'ERROR_UPLOADING_IMAGE',
    });
  }
});

const joinRoom = catchAsync(async (req, res) => {
  const user = req.user;
  const roomId = req.params.roomId;

  await roomService.joinRoom(roomId, user);
  return res.status(200).json({ message: 'User added to room' });
});

const inquireHostbyRoomId = catchAsync(async (req, res) => {
  const roomId = req.params.roomId;
  const userId = req.user.id;

  if (!roomId) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const rooms = await roomService.inquireHostbyRoomId(roomId, userId);
  return res.status(200).json({ data: rooms });
});

export default {
  createRoom,
  roomsByHost,
  roomsByGuest,
  roomsByMe,
  genders,
  ages,
  times,
  inquireHostbyRoomId,
  uploadRoomImage,
  joinRoom,
};
