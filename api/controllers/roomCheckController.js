import { passRoomsData } from "../services/index.js";
import { catchAsync } from "../utils/error.js";

const roomCheckData = catchAsync(async(req,res, next) => {
    const roomsData = await passRoomsData(req.query);
    res.status(200).json({data : roomsData});
})

export{roomCheckData}