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
    const approval_url: string = 'http://localhost:8080/point/approve';
    const fail_url: string = 'http://localhost:8080/point/approve';
    const cancel_url: string = 'http://localhost:8080/point/approve';

    const {
      partner_order_id,
      partner_user_id,
      item_name,
      quantity,
      total_amount,
      tax_free_amount,
    } = req.query;

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
        partner_user_id,
        item_name,
        quantity: Number(quantity),
        total_amount: Number(total_amount),
        tax_free_amount: Number(tax_free_amount),
        approval_url,
        fail_url,
        cancel_url,
      },
    }).catch((err: Error) =>
      res.status(400).json({ message: '결제에 실패하였습니다.' }),
    );

    await pointDb.createPoint(
      response.data.tid,
      state,
      req.userId,
      Number(req.query.total_amount),
    );

    // console.log(response['data']);
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

    const pointCharge = await pointDb.findUserChargePoint(
      Number(req.userId),
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
        cid: _cid,
        //partner_order_id,
        partner_user_id: pointCharge!.userId,
        pg_token,
        total_amount: pointCharge!.point,
      },
    }).catch((err: Error) =>
      res.status(400).json({ message: '결제에 실패하였습니다.' }),
    );
  },
  cancel: async (req: Request, res: Response) => {},
  order: async (req: Request, res: Response) => {},
};
