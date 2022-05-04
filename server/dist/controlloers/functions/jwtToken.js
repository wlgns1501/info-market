"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const config_1 = require("../../config");
module.exports = {
    // token으로 sign
    generateAccessToken: (id, grade) => {
        return jwt.sign({ id, grade }, config_1.config.jwt.secret_key, {
            expiresIn: config_1.config.jwt.expiresIn,
        });
    },
    generateRefreshToken: (id, grade) => {
        return jwt.sign({ id, grade }, config_1.config.jwt.secret_key, {
            expiresIn: config_1.config.jwt.expiresIn,
        });
    },
    // JWT 토큰을 쿠키로 전달
    // sendToken: (res, refreshToken) => {
    //   const cookieOptions = {
    //     httpOnly: true,
    //   };
    //   res.cookie('refreshToken', refreshToken, cookieOptions);
    // },
    // JWT 토큰 정보를 받아서 검증
};
