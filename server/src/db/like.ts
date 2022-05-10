import Like from '../models/like';

export async function likeClick(userId: number, infoId: number) {
  return await Like.create({
    userId,
    infoId,
  });
}

export async function likeClickCancel(infoId: number) {
  return await Like.destroy({
    where: { id: infoId },
  });
}

export async function findUser(userId: number) {
  return await Like.findOne({
    where: { userId },
  });
}
