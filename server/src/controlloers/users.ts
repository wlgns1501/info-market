import * as userDb from '../db/user';
import { Request, Response } from 'express';
const bcrypt = require('./functions/bcrypt');
import * as infoDb from '../db/info';

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
    console.log(pages);

    console.log(userId);

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

    if (info.count === 0) {
      return res
        .status(406)
        .json({ message: '해당 게시물이 존재하지 않습니다.' });
    }

    return res
      .status(200)
      .json({ info, message: '내가 쓴 게시물을 불러왔습니다.' });
  },

  usersOrderInfo: async (req: Request, res: Response) => {},
  usersRefundInfo: async (req: Request, res: Response) => {},
};
