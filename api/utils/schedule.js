import schedule from 'node-schedule';

import { dataSource } from '../models/dataSource.js';

const reviewNotification = schedule.scheduleJob('0 1 * * * *', async () => {
  const currentHour = new Date().getHours();

  const timeId = currentHour;

  const userIds = await dataSource.query(
    `
    SELECT 
    ro.host_id userId,
    ro.id roomId
    FROM rooms ro
    JOIN room_guests rg ON rg.room_id = ro.id
    WHERE ro.room_status_id = 3 AND ro.time_id = ${timeId} 
    -- roomStatusId = 3 => 결제 완료된 상태

    UNION

    SELECT 
    rg.user_id userId,
    rg.room_id
    FROM rooms ro
    JOIN room_guests rg ON rg.room_id = ro.id
    WHERE ro.room_status_id = 3 AND ro.time_id = ${timeId}
  `
  );

  for (const user of userIds) {
    const userId = user.userId;
    const roomId = user.roomId;

    await dataSource.query(
      `
    INSERT INTO
      notifications(
        user_id,
        room_id,
        message_id,
        content
      ) VALUES (
        ${userId},
        ${roomId},
        1,
        "식당에 대한 리뷰 작성 부탁드려요 !"
      )
  `
    );
  }

  console.log('UPDATED_NOTIFICATION');
});

export { reviewNotification };
