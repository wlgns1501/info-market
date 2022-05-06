import { NextFunction, Request, Response } from 'express';
import * as userDb from '../db/user';
import * as adminDb from '../db/admin';

module.exports = {
  getInfo: async (req: Request, res: Response) => {},
  editInfo: async (req: Request, res: Response) => {},
  removeInfo: async (req: Request, res: Response) => {},
};
