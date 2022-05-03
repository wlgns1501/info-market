// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV?.trim() || 'development';
// const config = require(__dirname + '/../config/config.js')[env];
// const db: any = {};

// let sequelize: any;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config,
//   );
// }

// fs.readdirSync(__dirname)
//   .filter((file: string) => {
//     return (
//       file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts'
//     );
//   })
//   .forEach((file: any) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes,
//     );
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export default db;

// import

import User, { associate as associateUser } from './user';
import Info, { associate as associateInfo } from './info';
import Admin from './admin';
import Payment, { associate as associatePayment } from './payment';
import Reply, { associate as associateReply } from './reply';
import Like, { associate as associateLike } from './reply';

export * from './sequelize';
const db = {
  User,
  Info,
  Admin,
  Payment,
  Reply,
  Like,
};

export type dbType = typeof db;

associateUser(db);
associateInfo(db);
associatePayment(db);
associateReply(db);
associateLike(db);
