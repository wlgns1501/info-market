import { Request, Response } from 'express';
import * as searchDb from '../db/search';

module.exports = {
  get: async (req: Request, res: Response) => {
    const { search_type, info_type, pages, limit, like_type } = req.query;
    let like;

    if (like_type === 'true') {
      like = 'desc';
    } else if (like_type === 'false') {
      like = 'asc';
    }

    if (search_type === 'titles') {
      const { titles } = req.query;

      if (!titles) {
        return res.status(400).json({ message: '제목을 입력해 주세요.' });
      }

      if (info_type === 'All') {
        const findInfoBy = await searchDb.searchAllTitle(
          String(titles),
          Number(pages),
          Number(limit),
          String(like),
        );

        if (findInfoBy.count === 0) {
          return res.status(406).json({ message: '해당 게시물이 없습니다.' });
        }

        return res
          .status(200)
          .json({ info: findInfoBy, message: '해당 게시물을 불러왔습니다.' });
      } else {
        const findInfoBy = await searchDb.searchByTitle(
          String(titles),
          Number(pages),
          Number(limit),
          String(info_type),
          String(like),
        );

        if (findInfoBy.count === 0) {
          return res.status(406).json({ message: '해당 게시물이 없습니다.' });
        }

        return res
          .status(200)
          .json({ info: findInfoBy, message: '해당 게시물을 불러왔습니다.' });
      }
    } else if (search_type === 'content') {
      const { content } = req.query;

      if (!content) {
        return res.status(400).json({ message: '내용을 입력해 주세요.' });
      }

      if (info_type === 'All') {
        const findInfoBy = await searchDb.searchAllContent(
          String(content),
          Number(pages),
          Number(limit),
          String(like),
        );

        if (findInfoBy.count === 0) {
          return res.status(406).json({ message: '해당 게시물이 없습니다.' });
        }

        return res
          .status(200)
          .json({ info: findInfoBy, message: '해당 게시물을 불러왔습니다.' });
      } else {
        const findInfoBy = await searchDb.searchByContent(
          String(content),
          Number(pages),
          Number(limit),
          String(info_type),
          String(like),
        );

        if (findInfoBy.count === 0) {
          return res.status(406).json({ message: '해당 게시물이 없습니다.' });
        }

        return res
          .status(200)
          .json({ info: findInfoBy, message: '해당 게시물을 불러왔습니다.' });
      }
    } else if (search_type === 'nickname') {
      // 닉네임 검색 수정 필요. 몇개 있는지는 검색이 되지만 내용이 검색 안됨
      const { nickname } = req.query;
      if (!nickname) {
        return res.status(400).json({ message: '내용을 입력해 주세요.' });
      }

      if (info_type === 'All') {
        const findInfoBy = await searchDb.searchAllNick(
          String(nickname),
          Number(pages),
          Number(limit),
          String(like),
        );

        if (findInfoBy.count === 0) {
          return res.status(406).json({ message: '해당 게시물이 없습니다.' });
        }

        return res
          .status(200)
          .json({ info: findInfoBy, message: '해당 게시물을 불러왔습니다.' });
      } else {
        const findInfoBy = await searchDb.searchByNick(
          String(nickname),
          Number(pages),
          Number(limit),
          String(info_type),
          String(like),
        );

        if (findInfoBy.count === 0) {
          return res.status(406).json({ message: '해당 게시물이 없습니다.' });
        }

        return res
          .status(200)
          .json({ info: findInfoBy, message: '해당 게시물을 불러왔습니다.' });
      }
    }
  },
};
