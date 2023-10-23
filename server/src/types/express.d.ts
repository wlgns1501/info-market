import * as express from 'express';
import User from '../models/user';

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
