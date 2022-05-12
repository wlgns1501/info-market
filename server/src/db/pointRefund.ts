import Point from '../models/point';
import { Sequelize, Op, where } from 'sequelize';
import User from '../models/user';
import PointRefund from '../models/pointRefund';

export async function createPointRefund(
  imp_uid: string,
  merchant_uid: string,
  userId: number,
  cancel_point: number,
  reason: string,
  state: string,
) {
  return await PointRefund.create({
    userId,
    reason,
    merchant_uid,
    imp_uid,
    cancel_point,
    state,
  });
}

export async function findRefund(userId: number) {
  return await PointRefund.findAll({
    where: {
      userId,
    },
  });
}
