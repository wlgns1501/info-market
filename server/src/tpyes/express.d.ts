import db from '../models/index';

declare global {
  namespace Express {
    interface Request {
      userId?: db.User.id<string>;
      token?: string;
      grade?: db.User.grade | db.Admin.grade;
    }
  }
}
