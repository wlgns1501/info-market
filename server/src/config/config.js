// const dotenv = require('dotenv');
// dotenv.config();

// module.exports = {
//   development: {
//     username: process.env.username,
//     password: process.env.password,
//     database: process.env.database,
//     host: '127.0.0.1',
//     port: 3306,
//     dialect: 'mysql',
//   },
//   test: {
//     username: process.env.username,
//     password: process.env.password,
//     database: process.env.database,
//     host: '127.0.0.1',
//     port: 3306,
//     dialect: 'mysql',
//   },
//   production: {
//     username: process.env.username,
//     password: process.env.password,
//     database: process.env.database,
//     host: '127.0.0.1',
//     port: 3306,
//     dialect: 'mysql',
//   },
// };

const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

// console.log(process.env.password);

module.exports = {
  development: {
    username: process.env.username || 'root',
    password: process.env.password || '3837',
    database: process.env.database || 'info_market',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
  },
  test: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
  },
  production: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
  },
};
