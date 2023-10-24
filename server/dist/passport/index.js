"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const naver = require('./naverStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');
module.exports = () => {
    passport_1.default.serializeUser((user, done) => {
        console.log(user);
        done(null, user);
        //done(null, user.id);
    });
    passport_1.default.deserializeUser((id, done) => {
        User.findOne({ where: { id } })
            .then((user) => done(null, user))
            .catch((err) => done(err));
    });
    //local();
    naver();
    kakao();
};
