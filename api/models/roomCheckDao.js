import { dataSource } from "./dataSource.js";

const getRoomsData = async(conditionQuery) => {
    const queryRunner = await dataSource.createQueryRunner();
    
    try{
        await queryRunner.startTransaction();
        let conditionWhereQuery = [];
        const {type, district, Date, age, gender} = conditionQuery;

        if(type){
            let typeList = type.split(',');
            conditionWhereQuery.push(`restaurants.type IN (${typeList.map(type => `'${type}'`).join(', ')})`);
        }
        if(district){
            let districtId = await queryRunner.query(
                `
                SELECT id
                FROM districts
                WHERE districts.name = ?
                `,[district]
            )
            districtId = districtId[0]['id'];
            conditionWhereQuery.push(`restaurants.district_id = ${district_id}`);
        }
        if(Date){
            let [date,time] = Date.split('T');
            date = String(Number(date.split('-')[1])) + '/' + String(Number(date.split('-')[2]));
            time = time.split(':')[0] +':'+ time.split(':')[1];
            conditionWhereQuery.push(`rooms.date = '${date}'`);
            conditionWhereQuery.push(`rooms.time = '${time}'`);
        }
        if(age){
            let age_id = await queryRunner.query(
                `
                SELECT id
                FROM ages
                WHERE ages.age_range = ?
                `,[age]
            )
            age_id = age_id[0]['id'];
            conditionWhereQuery.push(`rooms.age_id = ${age_id}`);
        }
        if(gender){
            let genderId = await queryRunner.query(
                `
                SELECT id 
                FROM genders
                WHERE genders.gender = ?
                `,[gender]
            )
            genderId = genderId[0]['id'];
            conditionWhereQuery.push(`rooms.gender_id = ${gender_id}`);
        }
        const totalConditionQuery = conditionWhereQuery.join(" AND ");

        const roomsQuery = 
            `
                SELECT restaurants.id as '식당 id', rooms.id as '방 id', rooms.title as '방 제목', rooms.content as '방 내용'
                FROM restaurants
                JOIN rooms ON rooms.restaurant_id = restaurants.id
                WHERE ${totalConditionQuery}
                ORDER BY '식당 id' ASC;
            `
        let rooms = await queryRunner.query(roomsQuery);
        let restaurantsNumber = rooms[0]['식당 id'];
        let restaurantsQuantity = 0;
        let roomsBeforeNumber = 0;
        let roomsAfterNumber = 0;
        let roomsTransform;
        for(const index in rooms){
            if(restaurantsQuantity > 3){
                break;
            }
            if(index == rooms.length - 1 || rooms[index]['식당 id'] !== restaurantsNumber)
            {
                if(index == rooms.length - 1){
                    roomsAfterNumber = index+1;
                }else{
                    roomsAfterNumber = index;
                }
                roomsTransform.push({
                    "식당 id" : restaurantsNumber,
                    "방 목록" : rooms.slice(roomsBeforeNumber,roomsAfterNumber-1).map(item => ({
                        "방 id" : item["방 id"],
                        "방 title" : item["방 제목"],
                        "방 content" : item["방 내용"]
                    }))
                })
                roomsBeforeNumber = index;
                restaurantsQuantity += 1;
            }
        }
        return roomsTransform;
    } catch(error){
        await queryRunner.rollbackTransaction();
        throw error;
    }finally{
        await queryRunner.release();
    }
};

export default { getRoomsData }
