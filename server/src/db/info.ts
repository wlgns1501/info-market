import { Sequelize, Op, where } from 'sequelize';

import Info from '../models/info';
import User from '../models/user';

export async function getInfo(infoId: number) {
  return await Info.findOne({
    where: { id: infoId },
    attributes: [
      'id',
      [Sequelize.col('User.nickname'), 'nickname'],
      'title',
      'content',
      'userId',
      'createdAt',
      'updateTimestamp',
      'targetPoint',
      'type',
      'totalViews',
    ],
    include: [
      {
        model: User,
        attributes: [],
      },
    ],
  });
}

export async function getInfos(pages: number, limit: number) {
  return await Info.findAndCountAll({
    order: [['createdAt', 'desc']],
    limit,
    offset: (pages - 1) * 10,
    attributes: [
      'id',
      [Sequelize.col('User.nickname'), 'nickname'],
      'title',
      'content',
      'userId',
      'createdAt',
      'updateTimestamp',
      'targetPoint',
      'type',
    ],
    include: [
      {
        model: User,
        attributes: [],
      },
    ],
  });
}

export async function getMyInfos(pages: number, limit: number, userId: number) {
  return await Info.findAndCountAll({
    order: [['createdAt', 'desc']],
    limit,
    offset: (pages - 1) * 10,
    where: {
      userId,
    },
    attributes: [
      'id',
      [Sequelize.col('User.nickname'), 'nickname'],
      'title',
      'content',
      'userId',
      'createdAt',
      'updateTimestamp',
      'targetPoint',
      'type',
    ],
    include: [
      {
        model: User,
        attributes: [],
      },
    ],
  });
}

export async function createInfo(
  title: string,
  content: string,
  targetPoint: number,
  type: string,
  userId: number,
) {
  return await Info.create({
    title,
    content,
    targetPoint,
    type,
    userId,
  });
}

export async function removeInfo(infoId: string) {
  return await Info.destroy({
    where: { id: infoId },
  });
}

export async function BronzeEditInfo(
  infoId: string,
  title: string,
  content: string,
) {
  return await Info.update(
    {
      title,
      content,
    },
    { where: { id: infoId } },
  );
}

export async function SGEditInfo(
  infoId: string,
  title: string,
  content: string,
  targetPoint: number,
  type: string,
) {
  return await Info.update(
    {
      title,
      content,
      targetPoint,
      type,
    },
    { where: { id: infoId } },
  );
}

export async function viewsAdd(infoId: number, views: number) {
  return await Info.update(
    {
      totalViews: views + 1,
    },
    {
      where: {
        id: infoId,
      },
    },
  );
}
