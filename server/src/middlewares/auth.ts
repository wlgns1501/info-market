import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
import { config } from '../config';
import * as userDb from '../db/user';
import * as adminDb from '../db/admin';

const jwtToken = require('../controlloers/functions/jwtToken');

module.exports = {
  me: async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;
    const authHeader: string | undefined = req.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
    // console.log(token);

    if (!token) {
      return res
        .status(400)
        .json({ message: 'access Token이 존재하지 않습니다.' });
    }

    await jwt.verify(
      token,
      config.jwt.secret_key,
      async (error: Error, decoded: any) => {
        if (error) {
          return res.status(400).json({ message: '인증에 실패했습니다.' });
        }
        // console.log(decoded);

        // id, grade
        if (decoded.grade === 'admin') {
          const admin = await adminDb.findAdminByPK(decoded.id);
          if (!admin) {
            return res
              .status(400)
              .json({ message: '유저가 존재하지 않습니다.' });
          }

          req.user = decoded; // 다른 유저가 내 게시물 삭제하는 것을 방지하기 위해 검증하기 위해
          // req.token = token;
          // req.grade = decoded.grade; // 등급이 안되는데 상업적 게시물 올릴려고 할 때 검증하기 위해
          next();
        } else {
          const user = await userDb.findPkUser(decoded.id);

          if (!user) {
            return res
              .status(400)
              .json({ message: '유저가 존재하지 않습니다.' });
          }
          // console.log(user);

          req.user = decoded; // 다른 유저가 내 게시물 삭제하는 것을 방지하기 위해 검증하기 위해
          // req.token = token;
          // req.grade = decoded.grade; // 등급이 안되는데 상업적 게시물 올릴려고 할 때 검증하기 위해

          next();
        }
      },
    );
  },
  newAcc: (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.headers.cookie;

    if (!refreshToken) {
      return res.status(400).json({ message: 'refresh token이 없습니다.' });
    } else if (refreshToken === 'refreshtoken= ') {
      return res.status(400).json({
        message: 'refresh token이 없습니다. 다시 로그인 해주세요.',
      });
    }

    const getToken = refreshToken.split('=')[1].split(';')[0];
    // console.log(getToken);
    jwt.verify(
      getToken,
      config.jwt.secret_key,
      async (err: Error, decoded: any) => {
        if (err) {
          res.status(400).json({ message: '인증에 실패했습니다.' });
        }
        console.log(decoded);
        const user = await userDb.findPkUser(decoded.id);
        // console.log(user);
        if (!user) {
          return res.status(400).json({ message: '유저가 존재하지 않습니다.' });
        }

        const { id, grade } = user;
        const accessToken = await jwtToken.generateAccessToken(id, grade);

        return res.status(200).json({
          accToken: accessToken,
          message: 'accessToken을 새로 발급 받았습니다.',
        });
      },
    );
  },
};
