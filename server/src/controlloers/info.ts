import { Request, Response } from 'express';
import * as infoDb from '../db/info';

module.exports = {
  getInfo: async (req: Request, res: Response) => {
    const { infoId } = req.params;
    // console.log(infoId);

    if (!infoId) {
      return res.status(401).json({ message: '게시물을 선택하지 않았습니다.' });
    }

    const info = await infoDb.getInfo(infoId);
    // console.log(info);

    // let { totalViews } = info;
    if (!info) {
      return res.status(406).json({ message: '해당 게시물이 없습니다.' });
    }
    // totalViews += 1;
    return res.status(200).json({ info, message: '게시물을 가져왔습니다.' });
  },
  writeInfo: async (req: Request, res: Response) => {
    const { title, content, targetPoint, type } = req.body;
    const { userId, grade } = req;

    if (!title) {
      return res
        .status(400)
        .json({ message: '게시물의 제목이 입력되지 않았습니다.' });
    }
    if (!content) {
      return res
        .status(400)
        .json({ message: '게시물의 본문이 입력되지 않았습니다.' });
    }
    if (type !== 'Free' && grade === 'Bronze') {
      return res.status(403).json({ message: '회원 등급에 맞지 않습니다.' });
    }
    if (type === 'Free' && Number(targetPoint) !== 0) {
      return res
        .status(403)
        .json({ message: '해당 게시물은 무료 게시물 입니다.' });
    }

    const info = await infoDb.createInfo(
      title,
      content,
      targetPoint,
      type,
      userId,
    );

    return res
      .status(203)
      .json({ infoId: info, message: '게시물이 생성 되었습니다.' });
  },
  removeInfo: async (req: Request, res: Response) => {
    const { infoId } = req.params;
    const { userId } = req;

    const info = await infoDb.getInfo(infoId);

    if (!info) {
      return res.status(406).json({ message: '해당 게시물이 없습니다.' });
    }

    if (userId !== info.userId) {
      return res.status(403).json({ message: '유저가 일치하지 않습니다.' });
    }

    await infoDb.removeInfo(infoId);

    return res.status(200).json({ message: '게시물이 삭제 되었습니다.' });
  },
  putInfo: async (req: Request, res: Response) => {
    const { infoId } = req.params;
    const { userId, grade } = req;

    const info = await infoDb.getInfo(infoId);
    // console.log(grade);

    if (!info) {
      return res
        .status(406)
        .json({ message: '해당 게시물이 존재하지 않습니다.' });
    }

    if (userId !== info.userId) {
      return res.status(403).json({ message: '유저가 일치하지 않습니다.' });
    }

    const { title, content, type, targetPoint } = req.body;

    if (grade === 'Bronze') {
      if (type !== 'Free' && targetPoint !== 0) {
        return res.status(403).json({
          message: '해당 회원 등급은 유료 게시물로 변경 할 수 없습니다.',
        });
      }

      const info = await infoDb.BronzeEditInfo(infoId, title, content);

      return res.status(200).json({ message: ' 게시물이 수정되었습니다.' });
    } else {
      const info = await infoDb.SGEditInfo(
        infoId,
        title,
        content,
        targetPoint,
        type,
      );

      return res.status(200).json({ message: ' 게시물이 수정되었습니다.' });
    }
  },
};
