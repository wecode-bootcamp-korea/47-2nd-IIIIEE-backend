import axios from 'axios';
import { roomStatus } from '../enum/categories.js';

import { orderDao } from '../models/index.js';

const adminKey = process.env.ADMIN_KEY;
const cid = process.env.CID;
const partnerOrderId = process.env.PARTNER_ORDER_ID;
const partnerUserId = process.env.PARTNER_USER_ID;

const kakaoApprove = async (userId, pgToken, tid) => {
  const config = {
    method: 'POST',
    url: 'https://kapi.kakao.com/v1/payment/approve',
    headers: {
      Authorization: `KakaoAK ${adminKey}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    data: {
      cid: cid,
      tid: tid,
      partner_order_id: partnerOrderId,
      partner_user_id: partnerUserId,
      pg_token: pgToken,
    },
  };

  const result = await axios(config);

  if (result.status != 200) {
    const error = new Error(`${result.msg}`);
    throw error;
  }

  const {
    tid: orderNumber,
    item_name: roomId,
    amount: { total: totalPrice },
    quantity: quantity,
    payment_method_type: paymentMethodType,
  } = result.data;

  await orderDao.createRoomOrder(
    JSON.stringify(result.data.card_info),
    parseInt(roomId),
    userId,
    orderNumber,
    totalPrice,
    quantity,
    paymentMethodType,
    roomStatus.PURCHASED
  );
};

export default { kakaoApprove };
