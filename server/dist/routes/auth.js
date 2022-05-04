"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authControllers = require('../controlloers/auth');
// const { signup, login } = require('../controlloers/auth');
const authMe = require('../middlewares/auth');
// 로그인
router.post('/login', authControllers.login);
// 로그아웃
router.post('/logout', authMe.me, authControllers.logout);
// 회원가입
router.post('/signup', authControllers.signup);
// 회원탈퇴
router.delete('/:userId', authMe.me, authControllers.remove);
router.post('/newtoken', authMe.newAcc);
module.exports = router;
