import * as userDb from '../db/user';
import { Request, Response } from 'express';
const bcrypt = require('./functions/bcrypt');
import * as infoDb from '../db/info';
import * as paymentDb from '../db/payment';

module.exports = {
  getUsersInfo: async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (userId != req.userId) {
      return res.status(403).json({ message: '유저가 일치하지 않습니다.' });
    }

    const user = await userDb.findPkUser(Number(userId));

    if (!user) {
      return res
        .status(406)
        .json({ message: '해당 유저가 존재하지 않습니다.' });
    }

    return res.status(200).json({ user, message: '유저 정보를 가져왔습니다.' });
  },

  editUsersInfo: async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (userId != req.userId) {
      return res.status(403).json({ message: '유저가 일치하지 않습니다.' });
    }

    const user = await userDb.findPkUser(Number(userId));

    if (!user) {
      return res
        .status(406)
        .json({ message: '해당 유저가 존재하지 않습니다.' });
    }

    const { email, nickname, phone, password } = req.body;

    const editInfo = await userDb.findUser(email);

    if (editInfo) {
      return res.status(400).json({ message: '중복된 email 입니다.' });
    }

    const findNickname = await userDb.checkNickname(nickname);

    if (findNickname) {
      return res.status(400).json({ message: '중복된 닉네임 입니다.' });
    }

    const hashPw = await bcrypt.hash(password).catch((err: Error) => {
      console.log(err);
    });

    await userDb
      .editUserInfo(Number(userId), email, hashPw, nickname, phone)
      .catch(() => {
        return res
          .status(400)
          .json({ message: '회원 정보를 수정하는데 실패했습니다.' });
      });

    return res.status(200).json({ message: '유저 정보를 수정 했습니다.' });
  },

  usersWriteInfo: async (req: Request, res: Response) => {
    const { pages, limit } = req.query;
    const { userId } = req;

    console.log('userId : ', userId);

    const info = await infoDb.getMyInfos(
      Number(pages),
      Number(limit),
      Number(userId),
    );
    // .catch(() => {
    //   return res
    //     .status(400)
    //     .json({ message: '게시물을 불러오는데 실패하였습니다.' });
    // });
    console.log(info);

    if (info.count === 0) {
      return res
        .status(406)
        .json({ message: '해당 게시물이 존재하지 않습니다.' });
    }

    return res
      .status(200)
      .json({ info, message: '내가 쓴 게시물을 불러왔습니다.' });
  },

  usersOrderInfo: async (req: Request, res: Response) => {
    const { pages, limit } = req.query;
    const state: string = 'paid';
    const findOrders = await paymentDb.getPayments(
      Number(req.userId),
      Number(pages),
      Number(limit),
      state,
    );

    if (findOrders.count === 0) {
      return res.status(400).json({ message: '구매한 게시물이 없습니다.' });
    }

    return res.status(200).json({
      info: findOrders,
      message: '내가 구매한 게시물을 불러왔습니다.',
    });
  },
  usersRefundInfo: async (req: Request, res: Response) => {
    const { pages, limit } = req.query;
    const state: string = 'refund';
    const findOrders = await paymentDb.getPayments(
      Number(req.userId),
      Number(pages),
      Number(limit),
      state,
    );

    if (findOrders.count === 0) {
      return res.status(400).json({ message: '환불한 게시물이 없습니다.' });
    }

    return res.status(200).json({
      info: findOrders,
      message: '내가 환불한 게시물을 불러왔습니다.',
    });
  },
  postImg: async (req: Request, res: Response) => {
    const { profileImg } = req.body;
    const { userId } = req;
    if (!profileImg) {
      return res.status(400).json({ message: '이미지 파일이 없습니다.' });
    }

    await userDb.postImg(profileImg, Number(userId));
    return res
      .status(200)
      .json({ message: '이미지를 업로드 하는데 성공하였습니다.' });
  },
};
