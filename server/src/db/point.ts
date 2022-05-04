import Point from '../models/point';

export async function createPoint(
  tid: string,
  state: string,
  userId: number,
  point: number,
  partner_order_id: number,
) {
  return await Point.create({
    tid,
    state,
    userId,
    point,
    partner_order_id,
  });
}

export async function findUserChargePoint(userId: number, state: string) {
  return await Point.findOne({
    where: {
      userId,
      state,
    },
  });
}
