import User from '../models/user';
import Admin from '../models/admin';
declare global {
  namespace Express {
    interface Request {
      userId?: User.id;
      token?: string;
      grade?: User.grade | Admin.grade;
    }
  }
}
