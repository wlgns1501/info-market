import { Request, Response } from 'express';
import * as pointDb from '../db/point';
import axios from 'axios';
import { config } from '../config';

module.exports = {
  ready: async (req: Request, res: Response) => {
    const _url: string = 'https://kapi.kakao.com/v1/payment/ready';
    const _admin_key: string = String(config.kakao.admin_key);
    const _cid: string = 'TC0ONETIME';
    const headers = {
      Authorization: `KakaoAk ${_admin_key}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    const state: string = 'ready';
    const approval_url: string = 'http://localhost:3000';
    const fail_url: string = 'http://localhost:3000';
    const cancel_url: string = 'http://localhost:3000';
    const _userId = 1;

    const {
      partner_order_id,
      partner_user_id,
      item_name,
      quantity,
      total_amount,
      tax_free_amount,
    } = req.query;

    console.log(req.query);

    const response: any = await axios({
      url: _url,
      method: 'POST',
      headers: {
        Authorization: `KakaoAK ${_admin_key}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params: {
        cid: _cid,
        partner_order_id,
        partner_user_id: _userId,
        item_name,
        quantity: Number(quantity),
        total_amount: Number(total_amount),
        tax_free_amount: Number(tax_free_amount),
        approval_url,
        fail_url,
        cancel_url,
      },
    }).catch((err: Error) => {
      console.log(err);
      res.status(400).json({ message: '결제에 실패하였습니다.' });
    });

    // await pointDb.createPoint(
    //   response.data.tid,
    //   state,
    //   _userId,
    //   Number(req.query.total_amount),
    //   Number(req.query.partner_order_id),
    // );

    console.log(response['data']);
    const redirectUrl = response['data']['next_redirect_pc_url'];
    return res
      .status(200)
      .json({ redirectUrl, message: 'redirect url 입니다.' });
  },

  approve: async (req: Request, res: Response) => {
    const { pg_token } = req.query;
    const _admin_key: string = String(config.kakao.admin_key);
    const _cid: string = 'TC0ONETIME';
    const state = 'approve';
    const _url: string = 'https://kapi.kakao.com/v1/payment/approve';
    const _userId: number = 1;
    console.log(pg_token);

    const pointCharge = await pointDb.findUserChargePoint(
      Number(_userId),
      'ready',
    );

    const response: any = await axios({
      url: _url,
      method: 'POST',
      headers: {
        Authorization: `KakaoAK ${_admin_key}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params: {
        pg_token,
        cid: _cid,
        partner_order_id: String(pointCharge!.partner_order_id),
        partner_user_id: String(_userId),
        total_amount: pointCharge!.point,
        tid: pointCharge!.tid,
      },
    }).catch((err: Error) => {
      console.log(err);
      return res.status(400).json({ message: '결제에 실패하였습니다.' });
    });

    // console.log(response.data);

    // return res.status(200).json({ message: '결제가 완료되었습니다.' });
  },
  cancel: async (req: Request, res: Response) => {},
  order: async (req: Request, res: Response) => {},
};
