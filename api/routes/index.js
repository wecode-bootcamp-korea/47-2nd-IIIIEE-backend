

// ./routes/index.js
import express from "express";

const router = express.Router()

import {roomCheckRouter} from "./roomCheckRouter.js";
import {roomRouter} from './roomRouter.js';

router.use("/roomCheck",roomCheckRouter);
router.use('/rooms', roomRouter);

export default router
