import { Sequelize, Op } from 'sequelize';

import Info from '../models/info';
import User from '../models/user';

export async function searchByTitle(
  titles: string,
  pages: number,
  limit: number,
  info_type: string,
) {
  return await Info.findAndCountAll({
    order: [['createdAt', 'desc']],
    where: {
      title: {
        [Op.like]: '%' + titles + '%',
      },
      type: info_type,
      activate: true,
    },
    limit,
    offset: (pages - 1) * limit,
    attributes: [
      'id',
      [Sequelize.col('User.nickname'), 'nickname'],
      'title',
      'content',
      'userId',
      'createdAt',
      'updatedAt',
      'targetPoint',
      'type',
      'totalViews',
      'totalLikes',
    ],
    include: [
      {
        model: User,
        attributes: [],
      },
    ],
  });
}

export async function searchByContent(
  content: string,
  pages: number,
  limit: number,
  info_type: string,
) {
  return await Info.findAndCountAll({
    order: [['createdAt', 'desc']],
    where: {
      content: {
        [Op.like]: '%' + content + '%',
      },
      type: info_type,
      activate: true,
    },
    limit,
    offset: (pages - 1) * limit,
    attributes: [
      'id',
      [Sequelize.col('User.nickname'), 'nickname'],
      'title',
      'content',
      'userId',
      'createdAt',
      'updatedAt',
      'targetPoint',
      'type',
      'totalViews',
      'totalLikes',
    ],
    include: [
      {
        model: User,
        attributes: [],
      },
    ],
  });
}

export async function searchAllTitle(
  titles: string,
  pages: number,
  limit: number,
) {
  return await Info.findAndCountAll({
    order: [['createdAt', 'desc']],
    where: {
      title: {
        [Op.like]: '%' + titles + '%',
      },
      activate: true,
    },
    limit,
    offset: (pages - 1) * limit,
    attributes: [
      'id',
      [Sequelize.col('User.nickname'), 'nickname'],
      'title',
      'content',
      'userId',
      'createdAt',
      'updatedAt',
      'targetPoint',
      'type',
      'totalViews',
      'totalLikes',
    ],
    include: [
      {
        model: User,
        attributes: [],
      },
    ],
  });
}

export async function searchAllContent(
  content: string,
  pages: number,
  limit: number,
) {
  return await Info.findAndCountAll({
    order: [['createdAt', 'desc']],
    where: {
      content: {
        [Op.like]: '%' + content + '%',
      },
      activate: true,
    },
    limit,
    offset: (pages - 1) * limit,
    attributes: [
      'id',
      [Sequelize.col('User.nickname'), 'nickname'],
      'title',
      'content',
      'userId',
      'createdAt',
      'updatedAt',
      'targetPoint',
      'type',
      'totalViews',
      'totalLikes',
    ],
    include: [
      {
        model: User,
        attributes: [],
      },
    ],
  });
}

export async function searchByNick(
  Nickname: string,
  pages: number,
  limit: number,
  info_type: string,
) {
  return await Info.findAndCountAll({
    order: [['createdAt', 'desc']],
    where: {
      type: info_type,
      activate: true,
    },
    limit,
    offset: (pages - 1) * limit,
    attributes: [
      'id',
      [Sequelize.col('User.nickname'), 'nickname'],
      'title',
      'content',
      'userId',
      'createdAt',
      'updatedAt',
      'targetPoint',
      'type',
      'totalViews',
      'totalLikes',
    ],
    include: [
      {
        model: User,
        attributes: [],
        where: {
          nickname: {
            [Op.like]: '%' + Nickname + '%',
          },
        },
      },
    ],
  });
}

export async function searchAllNick(
  nickname: string,
  pages: number,
  limit: number,
) {
  return await Info.findAndCountAll({
    order: [['createdAt', 'desc']],
    limit,
    offset: (pages - 1) * limit,
    where: {
      activate: true,
    },
    attributes: [
      'id',
      [Sequelize.col('User.nickname'), 'nickname'],
      'title',
      'content',
      'userId',
      'createdAt',
      'updatedAt',
      'targetPoint',
      'type',
      'totalViews',
      'totalLikes',
    ],
    include: [
      {
        model: User,
        attributes: [],
        where: {
          nickname: {
            [Op.like]: '%' + nickname + '%',
          },
        },
      },
    ],
  });
}
