"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config = require('../config/config');
const env = process.env.NODE_ENV ||
    'development';
const { database, username, password } = config[env];
exports.sequelize = new sequelize_1.Sequelize(database, username, password, config[env]);
