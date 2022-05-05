import { Request, Response } from 'express';
import * as pointDb from '../db/point';
import axios from 'axios';
import { config } from '../config';

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
    // const { userId } = req.query;
    const userId: number = 1;
    // console.log(req.body.payment_method);

    if (!req.body.imp_uid) {
      return res.status(400).json({ message: '결제 번호를 받지 못했습니다.' });
    }

    if (!req.body.merchant_uid) {
      return res.status(400).json({ message: '주문 번호를 받지 못했습니다.' });
    }

    const pointCharge = await pointDb.createPoint(
      req.body.imp_uid,
      req.body.status,
      userId,
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

    const imp_token = response.data.response.access_token;

    const complete_url: string = `https://api.iamport.kr/payments/${req.body.imp_uid}`;

    const getPaymentData = await axios
      .get(complete_url, {
        headers: {
          Authorization: imp_token,
        },
      })
      .catch((err: Error) => {
        return res
          .status(400)
          .json({ message: '결제 정보를 조회하는데 실패하였습니다.' });
      });

    const paymentData = getPaymentData.data.response;

    const order = await pointDb.findUserChargePoint(
      userId,
      paymentData.merchant_uid,
    );

    const amountToBePaid = order?.point;

    const { amount, status } = paymentData;
    console.log(paymentData);

    if (amount === amountToBePaid) {
      // await pointDb.findAndUpdate(merchant_uid,  )
      switch (status) {
        case 'ready':
          break;
        case 'paid':
          return res
            .status(200)
            .json({ status: 'success', message: '결제에 성공하였습니다.' });
      }
    } else {
      return res.status(400).json({ message: '위조된 결제시도가 있습니다.' });
    }
  },
  cancel: async (req: Request, res: Response) => {},
};
