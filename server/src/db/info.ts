import { Sequelize, Op, where } from 'sequelize';

import Reply from '../models/reply';
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
      'targetPoint',
      'type',
      'file',
      'totalViews',
      'totalLikes',
    ],
    include: [
      {
        model: User,
        attributes: [],
      },
      {
        model: Reply,
        attributes: ['content', 'createdAt'],
        include: [
          {
            model: User,
            attributes: ['nickname'],
          },
        ],
      },
    ],
  });
}

export async function getInfos() {
  return await Info.findAll({
    order: [['totalLikes', 'desc']],
    limit: 10,
    attributes: [
      'id',
      [Sequelize.col('User.nickname'), 'nickname'],
      'title',
      'content',
      'userId',
      'createdAt',
      'updatedAt',
      'targetPoint',
      'activate',
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

export async function AdminGetInfo(
  pages: number,
  limit: number,
  activate: boolean,
) {
  return await Info.findAndCountAll({
    order: [['createdAt', 'desc']],
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
      'activate',
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
    where: {
      activate,
    },
  });
}

export async function getMyInfos(pages: number, limit: number, userId: number) {
  return await Info.findAndCountAll({
    order: [['createdAt', 'desc']],
    limit,
    offset: (pages - 1) * limit,
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

export async function createInfo(
  title: string,
  content: string,
  targetPoint: number,
  type: string,
  userId: number,
  activate: boolean,
  file: string,
) {
  return await Info.create({
    title,
    content,
    targetPoint,
    type,
    userId,
    activate,
    file,
  });
}

export async function removeInfo(infoId: number) {
  return await Info.destroy({
    where: { id: infoId },
  });
}

export async function BronzeEditInfo(
  infoId: string,
  title: string,
  content: string,
  file: string,
) {
  return await Info.update(
    {
      title,
      content,
      file,
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
  file: string,
) {
  return await Info.update(
    {
      title,
      content,
      targetPoint,
      type,
      file,
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

export async function LikesAdd(infoId: number, likes: number) {
  return await Info.update(
    {
      totalLikes: likes + 1,
    },
    {
      where: {
        id: infoId,
      },
    },
  );
}

export async function LikesSub(infoId: number, likes: number) {
  return await Info.update(
    {
      totalLikes: likes - 1,
    },
    {
      where: {
        id: infoId,
      },
    },
  );
}

export async function adminEditInfo(
  infoId: number,
  title: string,
  content: string,
  targetPoint: number,
  type: string,
  activate: boolean,
) {
  return await Info.update(
    {
      title,
      content,
      targetPoint,
      type,
      activate,
    },
    {
      where: {
        id: infoId,
      },
    },
  );
}

export async function activateInfo(activate: boolean, infoId: number) {
  return await Info.update(
    {
      activate,
    },
    {
      where: {
        id: infoId,
      },
    },
  );
}

export async function editInfoFile(infoId: number, file: string) {
  return await Info.update(
    {
      file,
    },
    {
      where: {
        id: infoId,
      },
    },
  );
}

export async function findFreeInfo(
  pages: number,
  limit: number,
  like: string,
  cursor: number,
) {
  return await Info.findAndCountAll({
    order: [
      ['createdAt', 'desc'],
      ['totalLikes', like],
    ],
    limit,
    attributes: [
      'id',
      [Sequelize.col('User.nickname'), 'nickname'],
      'title',
      'content',
      'userId',
      'createdAt',
      'updatedAt',
      'targetPoint',
      'activate',
      'type',
    ],
    include: [
      {
        model: User,
        attributes: [],
      },
    ],
    where: {
      id: { [Op.gt]: cursor },

      type: 'Free',
    },
  });
}

export async function findPaidInfo(
  pages: number,
  limit: number,
  like_type: string,
  activate: boolean,
  cursor: number,
) {
  return await Info.findAndCountAll({
    order: [
      ['createdAt', 'desc'],
      ['totalLikes', like_type],
    ],
    limit,
    attributes: [
      'id',
      [Sequelize.col('User.nickname'), 'nickname'],
      'title',
      'content',
      'userId',
      'createdAt',
      'updatedAt',
      'targetPoint',
      'activate',
      'type',
    ],
    include: [
      {
        model: User,
        attributes: [],
      },
    ],
    where: {
      id: { [Op.gt]: cursor },
      activate,
      type: 'Paid',
    },
  });
}
