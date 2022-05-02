import Info from '../models/info';
import User from '../models/user';

export async function getInfo(infoId: string) {
  return await Info.findOne({
    where: { id: infoId },
    include: [
      {
        model: User,
        attributes: ['nickname'],
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
