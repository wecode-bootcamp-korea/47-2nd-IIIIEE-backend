import express from 'express';

const router = express.Router();

import {roomRouter} from './roomRouter.js';

router.use('/rooms', roomRouter);

export default router;