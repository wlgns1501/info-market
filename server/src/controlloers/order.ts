import { Request, Response } from 'express';
import * as userDb from '../db/user';
import * as infoDb from '../db/info';
import { config } from '../config';

module.exports = {
  orderInfo: async (req: Request, res: Response) => {
    const { infoId } = req.params;
    const { userId } = req.userId;
  },
  refundInfo: async (req: Request, res: Response) => {},
};
