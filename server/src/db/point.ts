import Point from '../models/point';

export async function createPoint(
  tid: string,
  state: string,
  userId: number,
  point: number,
) {
  return await Point.create({
    tid,
    state,
    userId,
    point,
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
