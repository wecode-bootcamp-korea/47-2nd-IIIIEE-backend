import { dataSource } from './dataSource.js';
import roomDao from './roomDao.js';

const createOrder = async (
  roomId,
  userId,
  orderNumber,
  totalPrice,
  quantity,
  paymentId,
  paymentMethodType
) => {
  return await dataSource.query(
    `
      INSERT INTO orders(
        room_id,
        user_id,
        order_number,
        total_price,
        quantity,
        payment_id,
        payment_method_type
      ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      );
      `,
    [
      roomId,
      userId,
      orderNumber,
      totalPrice,
      quantity,
      paymentId,
      paymentMethodType,
    ]
  );
};

const createRoomOrder = async (
  cardInfo,
  roomId,
  userId,
  orderNumber,
  totalPrice,
  quantity,
  paymentMethodType,
  statusId
) => {
  const queryRunner = dataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();

    let insertCardData = {};

    if (cardInfo) {
      insertCardData = await dataSource.query(
        `
      INSERT INTO payments (
        info
      ) VALUES (?);
      `,
        [cardInfo]
      );
    }

    const paymentId = insertCardData.insertId;

    await createOrder(
      roomId,
      userId,
      orderNumber,
      totalPrice,
      quantity,
      paymentId,
      paymentMethodType
    );

    await roomDao.changeStatus(roomId, statusId);
    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

export default {
  createOrder,
  createRoomOrder,
};
