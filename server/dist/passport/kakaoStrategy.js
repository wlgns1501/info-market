"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const { Strategy: KakaoStrategy } = require('passport-kakao');
const bcrypt = require('../controlloers/functions/bcrypt');
const User = require('../models/user');
require('dotenv').config();
module.exports = () => {
    passport_1.default.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/oauth/kakao/callback',
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('kakao profile', profile);
        console.log(typeof profile.id);
        try {
            const exUser = yield User.findOne({
                where: { email: profile.email },
            });
            if (exUser) {
                done(null, exUser);
            }
            else {
                const newUser = yield User.create({
                    email: profile.email,
                    password: profile.password,
                });
                done(null, newUser);
            }
        }
        catch (error) {
            console.error(error);
            done(error);
        }
    })));
};
