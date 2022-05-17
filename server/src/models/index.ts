import User, { associate as associateUser } from './user';
import Info, { associate as associateInfo } from './info';
import Admin from './admin';
import Payment, { associate as associatePayment } from './payment';
import Reply, { associate as associateReply } from './reply';
import Like, { associate as associateLike } from './like';
import Point, { associate as associatePoint } from './point';
import PointRefund, { associate as associatePointRefund } from './pointRefund';
export * from './sequelize';

const db = {
  User,
  Info,
  Admin,
  Payment,
  Reply,
  Like,
  Point,
  PointRefund,
};

export type dbType = typeof db;

associateUser(db);
associateInfo(db);
associatePayment(db);
associateReply(db);
associateLike(db);
associatePoint(db);
associatePointRefund(db);
