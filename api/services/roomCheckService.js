import {roomCheckDao} from "../models/index.js";

const passRoomsData = async (conditionQuery) => {
    try{
        return await roomCheckDao.getRoomsData(conditionQuery);
    }catch(error){
        throw error;
    }
}

export { passRoomsData }