"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv = require('dotenv');
dotenv.config();
exports.config = {
    development: {
        username: process.env.username || 'root',
        password: process.env.password || '3837',
        database: process.env.database || 'info_market',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: process.env.username,
        password: process.env.password,
        database: process.env.database,
        host: '127.0.0.1',
        dialect: 'mysql',
    },
};
