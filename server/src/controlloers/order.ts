import { Request, Response } from 'express';
import * as userDb from '../db/user';
import * as infoDb from '../db/info';
import * as paymentDb from '../db/payment';

module.exports = {
  orderInfo: async (req: Request, res: Response) => {
    const { infoId } = req.params;
    const { restPoint, userId } = req.body;
    let state = 'ready';
    const tid = Math.floor(
      Math.floor(new Date().getTime() / 1000) + Math.floor(Math.random()),
    );
    // console.log(tid);

    if (userId !== Number(req.userId)) {
      return res.status(403).json({ message: '유저가 일치하지 않습니다.' });
    }

    const info = await infoDb.getInfo(Number(infoId));

    if (!info) {
      return res
        .status(406)
        .json({ message: '해당 게시물이 존재하지 않습니다.' });
    }

    if (info.userId === userId) {
      return res
        .status(400)
        .json({ message: '자신의 게시물은 구매할 수 없습니다.' });
    }

    const user = await userDb.findPkUser(Number(userId));

    const { point } = user;

    if (point < info.targetPoint) {
      return res.status(400).json({ message: '포인트가 부족 합니다.' });
    }

    state = 'paid';

    await paymentDb.createPayment(userId, Number(infoId), state, tid);

    await userDb.editUserPoint(userId, restPoint);

    return res
      .status(200)
      .json({ message: '해당 게시물을 구매하는데 성공하였습니다.' });
  },
  refundInfo: async (req: Request, res: Response) => {
    const { infoId } = req.params;

    const info = await infoDb.getInfo(Number(infoId));

    if (!info) {
      return res
        .status(406)
        .json({ message: '해당 게시물이 존재하지 않습니다.' });
    }

    const user = await userDb.findPkUser(Number(req.userId));

    const payment = await paymentDb.getPayment(infoId);

    if (!payment) {
      return res
        .status(400)
        .json({ message: '해당 게시물을 구매하지 않았습니다.' });
    }

    await userDb.editUserPoint(user?.id, info.targetPoint);

    await paymentDb.refundPayment(payment.tid).catch(() => {
      return res.status(400).json({ message: '환불하는데 실패하였습니다.' });
    });

    return res.status(200).json({ message: '환불 완료 했습니다.' });
  },
};
