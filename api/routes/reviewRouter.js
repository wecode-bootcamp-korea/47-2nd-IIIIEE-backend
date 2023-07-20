import express from "express";
import { reviewController } from "../controllers/index.js";
import { loginRequired } from "../utils/auth.js";

const reviewRouter = express.Router();

reviewRouter.post("", loginRequired, reviewController.createReview);

export { reviewRouter };
