import { Request, Response } from 'express';
import * as userDb from '../db/user';
import * as infoDb from '../db/info';
import * as likeDb from '../db/like';

module.exports = {
  like: async (req: Request, res: Response) => {
    const { infoId } = req.params;
    const { userId } = req;

    const userInfo = await userDb.findPkUser(userId);
    const likeInfo = await likeDb.findUser(userId);
    if (userInfo!.id === likeInfo!.dataValues.userId) {
      return res.status(403).json({ message: '이미 추천한 게시물입니다.' });
    }

    await likeDb.likeClick(Number(userId), Number(infoId));

    const info = await infoDb.getInfo(Number(infoId));
    await infoDb.LikesAdd(info!.id, Number(info!.totalLikes));

    return res.status(200).json({ message: '해당 게시물을 추천했습니다.' });
  },
  likeCancel: async (req: Request, res: Response) => {
    const { infoId } = req.params;
    const { userId } = req;

    //const userInfo = await userDb.findPkUser(userId);
    const likeInfo = await likeDb.findUser(userId);

    // if (userInfo!.id === likeInfo?.dataValues.userId) {
    //   return res
    //     .status(403)
    //     .json({ message: '이미 추천을 취소한 게시물입니다.' });
    // }

    await likeDb.likeClickCancel(Number(infoId));

    const info = await infoDb.getInfo(Number(infoId));
    await infoDb.LikesSub(info!.id, Number(info!.totalLikes));

    return res
      .status(200)
      .json({ message: '해당 게시물의 추천을 취소했습니다.' });
  },
};
