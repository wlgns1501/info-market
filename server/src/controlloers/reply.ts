import { Request, Response } from 'express';
import * as replyDb from '../db/reply';
import * as userDb from '../db/user';

module.exports = {
  writeReply: async (req: Request, res: Response) => {
    const { infoId } = req.params;
    const { userId } = req;
    const { content } = req.body;

    const exUser = await userDb.findPkUser(userId);

    if (!content) {
      return res.status(400).json({ message: '댓글을 입력해 주세요' });
    }

    const replyData = await replyDb.writeReply(content, userId, Number(infoId));

    return res.status(203).json({
      reply: replyData,
      nickname: exUser?.nickname,
      message: '댓글을 작성했습니다.',
    });
  },

  putReply: async (req: Request, res: Response) => {
    const { infoId, replyId } = req.params;
    const { userId } = req;
    const { content } = req.body;

    const exUser = await userDb.findPkUser(userId);
    const exReply = await replyDb.getReply(replyId);
    console.log(exReply?.userId);
    console.log(userId);
    console.log(exUser?.nickname);

    if (!content) {
      return res.status(400).json({ message: '댓글을 입력해 주세요' });
    }

    if (userId !== exReply?.userId) {
      return res
        .status(403)
        .json({ message: '해당 댓글을 작성한 유저가 아닙니다.' });
    }

    const replyData = await replyDb.modifyReply(
      content,
      userId,
      Number(infoId),
      Number(exReply?.id),
    );

    return res.status(201).json({
      reply: replyData,
      nuckname: exUser?.nickname,
      message: '댓글을 수정했습니다.',
    });
  },

  removeReply: async (req: Request, res: Response) => {
    const { infoId, replyId } = req.params;
    const { userId } = req;

    const exUser = await userDb.findPkUser(userId);
    const exReply = await replyDb.getReply(replyId);
    console.log(exReply?.userId);
    console.log(userId);
    console.log(exUser?.nickname);

    if (userId !== exReply?.userId) {
      return res
        .status(403)
        .json({ message: '해당 댓글을 작성한 유저가 아닙니다.' });
    }

    const replyData = await replyDb.deleteReply(replyId);

    return res.status(203).json({
      reply: replyData,
      nuckname: exUser?.nickname,
      numessage: '댓글을 삭제했습니다.',
    });
  },
};
