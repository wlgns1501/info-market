import { Request, Response } from 'express';
import * as pointDb from '../db/point';
import axios from 'axios';
import { config } from '../config';
import * as userDb from '../db/user';
import * as pointRefundDb from '../db/pointRefund';

module.exports = {
  getToken: async (req: Request, res: Response) => {
    return res.status(200).json({
      imp_cid: config.imp.imp_cid,
      imp_code: config.imp.imp_code,
      message: 'cid와 secret code 입니다.',
    });
  },
  approve: async (req: Request, res: Response) => {
    const imp_key = config.imp.imp_key;
    const imp_secret = config.imp.imp_secret;
    const url: string = 'https://api.iamport.kr/users/getToken';
    const { userId } = req;

    const user = await userDb.findPkUser(Number(userId));

    if (!user) {
      return res.status(403).json({ message: '유저가 존재하지 않습니다.' });
    }

    let userPoint: number = user.point;

    if (!req.body.imp_uid) {
      return res.status(400).json({ message: '결제 번호를 받지 못했습니다.' });
    }

    if (!req.body.merchant_uid) {
      return res.status(400).json({ message: '주문 번호를 받지 못했습니다.' });
    }

    const pointCharge = await pointDb.createPoint(
      req.body.imp_uid,
      req.body.status,
      Number(userId),
      req.body.amount,
      req.body.merchant_uid,
      req.body.pay_method,
    );

    const response: any = await axios
      .post(
        url,
        {
          imp_key,
          imp_secret,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      .catch((err) => {
        return res
          .status(400)
          .json({ message: 'iamport 토큰을 받아오는데 실패하였습니다.' });
      });

    const imp_token: string = response.data.response.access_token;

    const complete_url: string = `https://api.iamport.kr/payments/${pointCharge.imp_uid}`;

    const getPaymentData = await axios({
      url: complete_url,
      method: 'get',
      headers: { Authorization: imp_token },
    }).catch((err) => {
      console.log(err);
    });

    console.log(getPaymentData);

    const paymentData = getPaymentData.data.response;

    const order = await pointDb.findUserChargePoint(
      Number(userId),
      paymentData.merchant_uid,
    );

    const amountToBePaid = order?.point;

    const { amount, status } = paymentData;

    if (amount === amountToBePaid) {
      // await pointDb.findAndUpdate(merchant_uid,  )
      switch (status) {
        case 'ready':
          break;
        case 'paid':
          userPoint += pointCharge.point;

          await userDb.editUserPoint(Number(userId), userPoint);
          return res
            .status(200)
            .json({ status: 'success', message: '결제에 성공하였습니다.' });
      }
    } else {
      return res.status(400).json({ message: '위조된 결제시도가 있습니다.' });
    }
  },
  cancel: async (req: Request, res: Response) => {
    const imp_key = config.imp.imp_key;

    const imp_secret = config.imp.imp_secret;
    const url: string = 'https://api.iamport.kr/users/getToken';
    const { userId } = req;

    const user = await userDb.findPkUser(Number(userId));

    if (!user) {
      return res.status(403).json({ message: '유저가 존재하지 않습니다.' });
    }

    if (!req.body.merchant_uid) {
      return res.status(400).json({ message: '주문 번호를 받지 못했습니다.' });
    }

    const response: any = await axios
      .post(
        url,
        {
          imp_key,
          imp_secret,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      .catch((err) => {
        return res
          .status(400)
          .json({ message: 'iamport 토큰을 받아오는데 실패하였습니다.' });
      });

    const imp_token: string = response.data.response.access_token;

    const payment = await pointDb.findUserChargePoint(
      Number(req.userId),
      req.body.merchant_uid,
    );

    if (!payment) {
      return res
        .status(406)
        .json({ message: '포인트를 결제한 내역이 없습니다.' });
    }

    const paymentData = payment;

    const { merchant_uid, reason, cancel_point } = req.body;

    const cancelablePoint = paymentData.point - cancel_point;

    if (cancelablePoint < 0) {
      return res
        .status(400)
        .json({ message: '환불할 금액이 구매한 금액 보다 큽니다.' });
    }

    const getCancelData = await axios
      .post(
        'https://api.iamport.kr/payments/cancel',
        {
          reason,
          imp_uid: paymentData.imp_uid,
          amount: cancel_point,
          checksum: cancelablePoint,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: imp_token,
          },
        },
      )
      .catch((err) => {
        return res.status(400).json({ message: '환불 하는데 실패하였습니다.' });
      });

    const { responses } = getCancelData.data;

    if (cancelablePoint === 0) {
      await pointDb.removePoint(
        Number(req.userId),
        paymentData.merchant_uid,
        paymentData.imp_uid,
      );
      const pointRefund = await pointRefundDb.createPointRefund(
        paymentData.imp_uid,
        merchant_uid,
        Number(req.userId),
        cancel_point,
        reason,
        'AllRefund',
      );
    } else {
      await pointDb.partPointRefund(
        Number(req.userId),
        paymentData.merchant_uid,
        paymentData.imp_uid,
        cancelablePoint,
      );
      const pointRefund = await pointRefundDb.createPointRefund(
        paymentData.imp_uid,
        merchant_uid,
        Number(req.userId),
        cancel_point,
        reason,
        'PartRefund',
      );
    }

    return res
      .status(200)
      .json({ result: responses, message: '환불 하는데 성공하였습니다.' });
  },
};

// 10000원 -> 10000원 paid
// 5000원 -> 5000원 partRefund
