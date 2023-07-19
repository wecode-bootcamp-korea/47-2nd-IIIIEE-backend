import express from "express"
import { roomCheckData } from "../controllers/index.js";
import { globalErrorHandler } from "../utils/error.js";

const roomCheckRouter = express.Router();
roomCheckRouter.get('',roomCheckData, globalErrorHandler);

export { roomCheckRouter }