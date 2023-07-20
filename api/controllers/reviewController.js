import { reviewService } from "../services/index.js";
import { catchAsync } from "../utils/error.js";

const createReview = catchAsync(async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;
    throw error;
  }

  await reviewService.createReview(userId, req.body);
  return res.status(200).json({ message: "SUCCESS POST REVIEW" });
});
export default { createReview };
