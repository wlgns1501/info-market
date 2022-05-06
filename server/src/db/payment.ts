import Payment from '../models/payment';
import { Sequelize, Op } from 'sequelize';
import User from '../models/user';
import Info from '../models/info';

export async function createPayment(
  userId: number,
  infoId: number,
  state: string,
  tid: number,
) {
  return await Payment.create({
    userId,
    infoId,
    state,
    tid,
  });
}

export async function getPayment(infoId: number) {
  return await Payment.findOne({
    where: {
      id: infoId,
    },
    attributes: [
      'id',
      [Sequelize.col('User.nickname'), 'nickname'],
      [Sequelize.col('Info.title'), 'title'],
      [Sequelize.col('Info.content'), 'content'],
      [Sequelize.col('Info.targetPoint'), 'targetPoint'],
      [Sequelize.col('Info.totalViews'), 'totalViews'],
      [Sequelize.col('Info.totalLikes'), 'totalLikes'],
      'userId',
      'infoId',
      'tid',
    ],
    include: [
      {
        model: User,
        attributes: [],
      },
      {
        model: Info,
        attributes: [],
      },
    ],
  });
}

export async function refundPayment(tid: number) {
  return await Payment.update(
    {
      state: 'refund',
    },
    {
      where: {
        tid,
      },
    },
  );
}

export async function getPayments(
  userId: number,
  pages: number,
  limit: number,
  state: string,
) {
  return await Payment.findAndCountAll({
    where: {
      id: userId,
      state,
    },
    limit,
    offset: (pages - 1) * 10,
    order: [['createdAt', 'desc']],
    attributes: [
      'id',
      [Sequelize.col('User.nickname'), 'nickname'],
      [Sequelize.col('Info.title'), 'title'],
      [Sequelize.col('Info.content'), 'content'],
      [Sequelize.col('Info.targetPoint'), 'targetPoint'],
      [Sequelize.col('Info.totalViews'), 'totalViews'],
      [Sequelize.col('Info.totalLikes'), 'totalLikes'],
      'state',
      'tid',
      'userId',
      'infoId',
    ],
    include: [
      {
        model: User,
        attributes: [],
      },
      {
        model: Info,
        attributes: [],
      },
    ],
  });
}
