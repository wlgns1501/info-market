import { Sequelize } from 'sequelize';
const config = require('../config/config');
// import '../config/config';

// console.log(config);

const env =
  (process.env.NODE_ENV as 'production' | 'test' | 'development') ||
  'development';
const { database, username, password } = config[env];

console.log(config[env]);

export const sequelize = new Sequelize(
  database,
  username,
  password,
  config[env],
);
