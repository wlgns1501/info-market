import Info from '../models/info';
import { Request, Response } from 'express';
import * as infoDb from '../db/info';
import * as likeDb from '../db/like';

module.exports = {
  getInfo: async (req: Request, res: Response) => {
    const { infoId } = req.params;

    if (!infoId) {
      return res.status(401).json({ message: '게시물을 선택하지 않았습니다.' });
    }

    const info = await infoDb.getInfo(Number(infoId));
    const like = await likeDb.findUser(
      Number(info?.dataValues.userId),
      Number(infoId),
    );
    console.log(like);

    if (!info) {
      return res.status(406).json({ message: '해당 게시물이 없습니다.' });
    }

    await infoDb.viewsAdd(info.id, Number(info.totalViews));

    return res.status(200).json({
      info,
      like: like ? true : false,
      message: '게시물을 가져왔습니다.',
    });
  },
  writeInfo: async (req: Request, res: Response) => {
    const { title, content, targetPoint, type } = req.body;
    const { userId, grade } = req;
    let activate: boolean;

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

    if (type === 'Free') {
      activate = true;
    } else {
      activate = false;
    }

    const info = await infoDb.createInfo(
      title,
      content,
      targetPoint,
      type,
      userId,
      activate,
      req.body.file,
    );

    return res
      .status(203)
      .json({ infoId: info, message: '게시물이 생성 되었습니다.' });
  },
  removeInfo: async (req: Request, res: Response) => {
    const { infoId } = req.params;
    const { userId } = req;

    const info = await infoDb.getInfo(Number(infoId));

    if (!info) {
      return res.status(406).json({ message: '해당 게시물이 없습니다.' });
    }

    if (userId !== info.userId) {
      return res.status(403).json({ message: '유저가 일치하지 않습니다.' });
    }

    await infoDb.removeInfo(Number(infoId));

    return res.status(200).json({ message: '게시물이 삭제 되었습니다.' });
  },
  putInfo: async (req: Request, res: Response) => {
    const { infoId } = req.params;
    const { userId, grade } = req;

    const info = await infoDb.getInfo(Number(infoId));
    // console.log(grade);

    if (!info) {
      return res
        .status(406)
        .json({ message: '해당 게시물이 존재하지 않습니다.' });
    }

    if (userId !== info.userId) {
      return res.status(403).json({ message: '유저가 일치하지 않습니다.' });
    }

    // const { title, content, type, targetPoint } = req.body;

    if (
      grade === 'Bronze' &&
      req.body.type === 'Free' &&
      req.body.targetPoint === 0
    ) {
      const info = await infoDb.BronzeEditInfo(
        infoId,
        req.body.title,
        req.body.content,
        req.body.file,
      );
      // console.log(info);

      return res.status(200).json({ message: ' 게시물이 수정되었습니다.' });
    } else if (grade !== 'Bronze') {
      const info = await infoDb.SGEditInfo(
        infoId,
        req.body.title,
        req.body.content,
        req.body.targetPoint,
        req.body.type,
        req.body.file,
      );

      return res.status(200).json({ message: ' 게시물이 수정되었습니다.' });
    }
    return res.status(403).json({
      message: '해당 회원 등급은 유료 게시물로 변경 할 수 없습니다.',
    });
  },

  // 무한스크롤 / 인기순 10개
  getInfoes: async (req: Request, res: Response) => {
    const infoes = await infoDb.getInfos();

    if (!infoes) {
      return res.status(406).json({ message: '게시물이 존재하지 않습니다.' });
    }

    return res.status(200).json({
      info: infoes,
      message: `인기 게시물들을 가져왔습니다.`,
    });
  },
  editFile: async (req: Request, res: Response) => {
    const { infoId } = req.params;
    const { userId } = req;

    const info = await infoDb.getInfo(Number(infoId));

    if (!info) {
      return res
        .status(406)
        .json({ message: '해당 게시물이 존재하지 않습니다.' });
    }

    if (info.userId != userId) {
      return res.status(403).json({ message: '유저가 일치하지 않습니다.' });
    }

    await infoDb.editInfoFile(Number(infoId), req.body.file);
  },
  getFreeInfo: async (req: Request, res: Response) => {
    let { pages, limit, like_type } = req.query;
    let cursor: number;

    let like;

    if (!req.query.lastId) {
      cursor = await Info.count();
    } else {
      cursor = Number(req.query.lastId);
    }

    if (like_type === 'true') {
      like = 'desc';
    } else if (like_type === 'false') {
      like = 'asc';
    }

    const freeInfo = await infoDb.findFreeInfo(
      Number(pages),
      Number(limit),
      like,
      Number(cursor),
    );

    if (freeInfo.count === 0) {
      return res.status(406).json({ message: '게시물이 존재하지 않습니다.' });
    }

    return res.status(200).json({
      info: freeInfo,
      message: `${pages} 번 페이지 게시물들을 불러왔습니다.`,
    });
  },
  getPaidInfo: async (req: Request, res: Response) => {
    let { pages, limit, like_type } = req.query;
    const activate = true;
    let cursor: number;

    let like;

    if (like_type === 'true') {
      like = 'desc';
    } else if (like_type === 'false') {
      like = 'asc';
    }

    if (!req.query.lastId) {
      cursor = await Info.count();
    } else {
      cursor = Number(req.query.lastId);
    }

    const freeInfo = await infoDb.findPaidInfo(
      Number(pages),
      Number(limit),
      like,
      activate,
      Number(cursor),
    );

    if (freeInfo.count === 0) {
      return res.status(406).json({ message: '게시물이 존재하지 않습니다.' });
    }

    return res.status(200).json({
      info: freeInfo,
      message: `${pages} 번 페이지 게시물들을 불러왔습니다.`,
    });
  },
};
