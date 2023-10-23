import { Request, Response } from 'express';
import * as userDb from '../db/user';
const bcrypt = require('./functions/bcrypt');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('./functions/jwtToken');

module.exports = {
  signup: async (req: Request, res: Response) => {
    const { email, password, nickname, phone } = req.body;
    console.log(req.body);
    const exUser = await userDb.findUser(email);

    if (exUser) {
      return res.status(409).json({ message: '중복된 유저 입니다.' });
    }

    const findNickname = await userDb.checkNickname(nickname);

    if (findNickname) {
      return res.status(400).json({ message: '중복된 닉네임 입니다.' });
    }

    const hashPw: string = await bcrypt.hash(password).catch((err: Error) => {
      console.log(err);
    });

    // console.log(hashPw);

    const test = await userDb.createUser(email, hashPw, nickname, phone);
    // console.log(test);
    return res.status(201).json({
      id: test.id,
      message: '회원가입에 성공 했습니다.',
    });
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // console.log(req.body);

    const userInfo = await userDb.findUser(email);

    if (!userInfo) {
      // console.log('해당 유저 X');
      return res.status(401).json({ message: '해당 유저가 없습니다.' });
    }
    const { id, point, grade, phone, nickname } = userInfo;

    // npm문서에서 bcrypt 관련 내용 찾아보기
    const verification: string = await bcrypt
      .comparePw(password, userInfo.password)
      .catch((err: Error) => {
        console.log(err);
      });

    // console.log(verification);
    if (!verification) {
      // console.log('비밀번호가 일치 X');
      return res.status(400).json({ message: '비밀번호가 일치하지 않음' });
    }
    // 토큰 [id(PK), grade)]생성하고 전달.
    const accToken: string = generateAccessToken(userInfo);
    const refreshToken: string = generateRefreshToken(userInfo);
    const cookieOptions = {
      httpOnly: true,
    };
    // console.log(refreshToken);
    // id, token, point, grade, message
    return res
      .cookie('refreshToken', refreshToken, cookieOptions)
      .status(201)
      .json({
        id,
        point,
        grade,
        nickname,
        phone,
        accToken: accToken,
        message: '로그인에 성공 했습니다.',
      });
  },
  logout: async (req: Request, res: Response) => {
    res
      .cookie('refreshToken', '')
      .status(200)
      .json({ message: '로그아웃에 성공했습니다.' });
  },
  remove: async (req: Request, res: Response) => {
    // const { userId } = req.params;
    const tokenUserId: number | undefined = req.user?.id;

    if (tokenUserId !== Number(req.params.userId)) {
      return res.status(403).json({ message: '유저가 일치하지 않습니다' });
    }

    const user = await userDb.findPkUser(Number(req.params.userId));

    if (!user) {
      return res.status(401).json({ message: '해당 유저가 없습니다.' });
    }

    await userDb.removeUser(Number(req.params.userId)).catch(() => {
      return res.status(400).json({ message: '회원탈퇴에 실패 하였습니다.' });
    });

    return res
      .cookie('refreshToken', '')
      .status(204)
      .json({ message: '회원이 탈퇴 처리 되었습니다.' });
  },
};
