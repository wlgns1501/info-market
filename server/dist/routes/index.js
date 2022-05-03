"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authRouter = require('./auth');
const adminRouter = require('./admin');
const infoRouter = require('./info');
const searchRouter = require('./search');
const usersRouter = require('./users');
// 로그인, 로그아웃, 회원가입, 회원 탈퇴
router.use('/auth', authRouter);
// admin
router.use('/admin', adminRouter);
// 게시물, 댓글
router.use('/info', infoRouter);
// 검색
router.use('/search', searchRouter);
// 내 정보
router.use('/users', usersRouter);
module.exports = router;
