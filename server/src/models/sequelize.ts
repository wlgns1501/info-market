import { Sequelize } from 'sequelize';
const config = require('../config/config');

const env =
  (process.env.NODE_ENV as 'production' | 'test' | 'development') ||
  'development';
const { database, username, password } = config[env];

export const sequelize = new Sequelize(
  database,
  username,
  password,
  config[env],
);
