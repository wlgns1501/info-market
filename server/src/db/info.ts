import db from '../models/index';

type Info = {
  infoId: string;
  title: string;
  content: string;
  targetPoint: number;
  type: string;
  totalViews: number;
  userId: number;
};

export async function getInfo(infoId: string): Promise<Info | null> {
  return await db.Info.findOne({
    where: { id: infoId },
    // include: [
    //   {
    //     model: db.User,
    //     attribute: ['nickname'],
    //   },
    // ],
  });
}

export async function createInfo(
  title: string,
  content: string,
  targetPoint: number,
  type: string,
): Promise<Info> {
  return await db.Info.create({
    title,
    content,
    targetPoint,
    type,
  });
}

export async function removeInfo(infoId: string): Promise<void> {
  return await db.Info.destroy({
    where: infoId,
  });
}

export async function BronzeEditInfo(
  infoId: string,
  title: string,
  content: string,
): Promise<void> {
  return await db.Info.update(
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
): Promise<void> {
  return await db.Info.update(
    {
      title,
      content,
      targetPoint,
      type,
    },
    { where: { id: infoId } },
  );
}
