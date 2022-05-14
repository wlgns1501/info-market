import Point from '../models/point';
import { Sequelize, Op, where } from 'sequelize';
import User from '../models/user';

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
    attributes: [
      'point',
      'merchant_uid',
      'imp_uid',
      'payment_method_type',
      'createdAt',
      'state',
      [Sequelize.col('User.nickname'), 'nickname'],
    ],
    include: [
      {
        model: User,
        attributes: [],
      },
    ],
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

export async function removePoint(
  userId: number,
  merchant_uid: string,
  imp_uid: string,
) {
  return await Point.destroy({
    where: {
      userId,
      merchant_uid,
      imp_uid,
    },
  });
}

export async function partPointRefund(
  userId: number,
  merchant_uid: string,
  imp_uid: string,
  cancel_point: number,
) {
  return await Point.update(
    {
      point: cancel_point,
    },
    {
      where: {
        userId,
        merchant_uid,
        imp_uid,
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

export async function findUserPaidbyUserId(userId: number) {
  return await Point.findAll({
    where: {
      userId,
    },
    attributes: [
      'id',
      'state',
      'point',
      [Sequelize.col('User.nickname'), 'nickname'],
      'createdAt',
      'merchant_uid',
      'imp_uid',
      'payment_method_type',
    ],
    include: {
      model: User,
      attributes: [],
    },
  });
}
