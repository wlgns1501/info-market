import { Request, Response } from 'express';
// import * as pointDb from '../db/point';
import axios from 'axios';
import { config } from '../config';

module.exports = {
  ready: async (req: Request, res: Response) => {
    const _url: string = 'https://kapi.kakao.com/v1/payment/ready';
    const _admin_key: string = config.kakao.admin_key;
    const _cid: string = 'TC0ONETIME';
    const headers = {
      Authorization: `KakaoAk ${_admin_key}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    // console.log(_admin_key);
    // console.log(_cid);

    const {
      partner_order_id,
      partner_user_id,
      item_name,
      quantity,
      total_amount,
      tax_free_amount,
      approval_url,
      fail_url,
      cancel_url,
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

    console.log(response['data']);
  },
  approve: async (req: Request, res: Response) => {},
  cancel: async (req: Request, res: Response) => {},
  order: async (req: Request, res: Response) => {},
};
