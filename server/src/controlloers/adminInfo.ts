import { NextFunction, Request, Response } from 'express';
import * as userDb from '../db/user';
import * as adminDb from '../db/admin';
import * as infoDb from '../db/info';

module.exports = {
  getInfo: async (req: Request, res: Response) => {
    const { pages, limit } = req.query;
    const { grade } = req.grade;
    const activate: boolean = true;
    if (grade !== 'admin') {
      return res.status(403).json({ message: '해당 권한이 없습니다.' });
    }

    const infos = await infoDb.getInfos(Number(pages), Number(limit), activate);

    if (infos.count === 0) {
      return res.status(400).json({ message: '게시물이 존재하지 않습니다.' });
    }

    return res
      .status(200)
      .json({ info: infos, message: '게시물들을 불러왔습니다.' });
  },
  editInfo: async (req: Request, res: Response) => {
    const { infoId } = req.params;

    const { grade } = req.grade;

    if (grade !== 'admin') {
      return res.status(403).json({ message: '해당 권한이 없습니다.' });
    }

    const info = await infoDb.getInfo(Number(infoId));

    if (!info) {
      return res
        .status(406)
        .json({ message: '해당 게시물이 존재하지 않습니다.' });
    }

    const { title, content, targetPoint, type, activate } = req.body;

    await infoDb.adminEditInfo(
      info.id,
      title,
      content,
      Number(targetPoint),
      type,
      activate,
    );
  },
  removeInfo: async (req: Request, res: Response) => {
    const { infoId } = req.params;

    const { grade } = req.grade;

    if (grade !== 'admin') {
      return res.status(403).json({ message: '해당 권한이 없습니다.' });
    }

    const info = await infoDb.getInfo(Number(infoId));

    if (!info) {
      return res
        .status(406)
        .json({ message: '해당 게시물이 존재하지 않습니다.' });
    }

    await infoDb.removeInfo(Number(infoId));

    return res.status(200).json({ message: '해당 게시물을 삭제하였습니다.' });
  },
  activateInfo: async (req: Request, res: Response) => {
    const { infoId } = req.params;

    const { grade } = req.grade;

    if (grade !== 'admin') {
      return res.status(403).json({ message: '해당 권한이 없습니다.' });
    }

    const info = await infoDb.getInfo(Number(infoId));

    if (!info) {
      return res
        .status(406)
        .json({ message: '해당 게시물이 존재하지 않습니다.' });
    }

    const { activate } = req.body;

    await infoDb.activateInfo(activate, Number(infoId));

    return res.status(200).json({ message: '해당 게시물을 인증하였습니다.' });
  },
};
