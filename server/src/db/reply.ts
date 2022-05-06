import Reply from '../models/reply';

export async function writeReply(
  content: string,
  userId: number,
  infoId: number,
) {
  return await Reply.create({
    content,
    userId,
    infoId,
  });
}

export async function modifyReply(
  content: string,
  userId: number,
  infoId: number,
  replyId: number,
) {
  return await Reply.update(
    {
      content,
      userId,
      infoId,
    },
    { where: { id: replyId } },
  );
}

export async function deleteReply(replyId: string) {
  return await Reply.destroy({
    where: { id: replyId },
  });
}

export async function getReply(replyId: string) {
  return await Reply.findOne({
    where: { id: replyId },
  });
}
