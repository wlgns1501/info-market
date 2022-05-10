import Point from '../models/point';

export async function createPoint(
  imp_uid: string,
  state: string,
  userId: number,
  point: number,
  merchant_uid: string,
  payment_method_type: string,
) {
  return await Point.create({
    imp_uid,
    state,
    userId,
    point,
    merchant_uid,
    payment_method_type,
  });
}

export async function findUserChargePoint(
  userId: number,
  merchant_uid: string,
) {
  return await Point.findOne({
    where: {
      userId,
      merchant_uid,
    },
  });
}

export async function editPoint(tid: string) {
  return await Point.update(
    {
      state: 'approve',
    },
    {
      where: {
        tid,
      },
    },
  );
}

// export async function findAndUpdate(
//   imp_uid: string,
//   state: string,
//   userId: number,
//   point: number,
//   merchant_uid: string,
//   payment_method_type: string,
// ) {
//   return await Point.({
//     tid,
//     state: '',
//   });
// }
