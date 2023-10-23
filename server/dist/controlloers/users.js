"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userDb = __importStar(require("../db/user"));
const bcrypt = require('./functions/bcrypt');
const infoDb = __importStar(require("../db/info"));
const paymentDb = __importStar(require("../db/payment"));
const pointDb = __importStar(require("../db/point"));
const pointRefundDb = __importStar(require("../db/pointRefund"));
module.exports = {
    getUsersInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        if (userId != req.userId) {
            return res.status(403).json({ message: '유저가 일치하지 않습니다.' });
        }
        const user = yield userDb.findPkUser(Number(userId));
        if (!user) {
            return res
                .status(406)
                .json({ message: '해당 유저가 존재하지 않습니다.' });
        }
        return res.status(200).json({ user, message: '유저 정보를 가져왔습니다.' });
    }),
    editUsersInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        if (userId != req.userId) {
            return res.status(403).json({ message: '유저가 일치하지 않습니다.' });
        }
        const user = yield userDb.findPkUser(Number(userId));
        if (!user) {
            return res
                .status(406)
                .json({ message: '해당 유저가 존재하지 않습니다.' });
        }
        let email;
        let password;
        let phone;
        let nickname;
        if (req.body.email) {
            email = req.body.email;
        }
        else {
            email = user.email;
        }
        if (req.body.password) {
            password = yield bcrypt.hash(req.body.password).catch((err) => {
                console.log(err);
            });
        }
        else {
            password = user.password;
        }
        if (req.body.phone) {
            phone = req.body.phone;
        }
        else {
            phone = user.phone;
        }
        if (req.body.nickname) {
            nickname = req.body.nickname;
        }
        else {
            nickname = user.nickname;
        }
        yield userDb
            .editUserInfo(Number(userId), email, password, nickname, phone)
            .catch(() => {
            return res
                .status(400)
                .json({ message: '회원 정보를 수정하는데 실패했습니다.' });
        });
        return res.status(200).json({ message: '유저 정보를 수정 했습니다.' });
    }),
    usersWriteInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { pages, limit } = req.query;
        const { userId } = req;
        // console.log('userId : ', userId);
        const info = yield infoDb.getMyInfos(Number(pages), Number(limit), Number(userId));
        if (info.count === 0) {
            return res
                .status(406)
                .json({ message: '해당 게시물이 존재하지 않습니다.' });
        }
        return res
            .status(200)
            .json({ info, message: '내가 쓴 게시물을 불러왔습니다.' });
    }),
    usersOrderInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { pages, limit } = req.query;
        const state = 'paid';
        const findOrders = yield paymentDb.getPayments(Number(req.userId), Number(pages), Number(limit), state);
        if (findOrders.count === 0) {
            return res.status(400).json({ message: '구매한 게시물이 없습니다.' });
        }
        return res.status(200).json({
            info: findOrders,
            message: '내가 구매한 게시물을 불러왔습니다.',
        });
    }),
    usersRefundInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { pages, limit } = req.query;
        const state = 'refund';
        const findOrders = yield paymentDb.getPayments(Number(req.userId), Number(pages), Number(limit), state);
        if (findOrders.count === 0) {
            return res.status(400).json({ message: '환불한 게시물이 없습니다.' });
        }
        return res.status(200).json({
            info: findOrders,
            message: '내가 환불한 게시물을 불러왔습니다.',
        });
    }),
    postImg: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { profileImg } = req.body;
        const { userId } = req;
        yield userDb.postImg(profileImg, Number(userId));
        return res
            .status(200)
            .json({ message: '이미지를 업로드 하는데 성공하였습니다.' });
    }),
    checkNickname: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const findNickname = yield userDb.checkNickname(req.body.nickname);
        if (findNickname) {
            return res.status(400).json({ message: '중복된 닉네임 입니다.' });
        }
        return res.status(200).json({ message: '사용할 수 있는 닉네임 입니다.' });
    }),
    paidPoint: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        if (userId != req.userId) {
            return res.status(403).json({ message: '유저가 일치하지 않습니다.' });
        }
        const user = yield userDb.findPkUser(Number(userId));
        if (!user) {
            return res
                .status(406)
                .json({ message: '해당 유저가 존재하지 않습니다.' });
        }
        const paidPoint = yield pointDb.findUserPaidbyUserId(Number(userId));
        if (!paidPoint) {
            return res
                .status(406)
                .json({ message: '포인트를 충전한 내역이 없습니다.' });
        }
        return res
            .status(200)
            .json({ paidPoint, message: '포인트 충전 내역을 불러왔습니다.' });
    }),
    checkEmail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const editInfo = yield userDb.findUser(req.body.email);
        if (editInfo) {
            return res.status(400).json({ message: '중복된 Email 입니다.' });
        }
        return res.status(200).json({ message: '사용할 수 있는 Email 입니다.' });
    }),
    getRefundPoint: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const refundPoint = yield pointRefundDb.findRefund(Number(req.userId));
        if (!refundPoint) {
            return res.status(406).json({ message: '포인트 환불 내역이 없습니다.' });
        }
        return res.status(200).json({
            refund: refundPoint,
            message: '포인트 환불 내역을 불러왔습니다.',
        });
    }),
};
