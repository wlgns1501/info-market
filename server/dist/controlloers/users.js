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
        const { email, nickname, phone, password } = req.body;
        const editInfo = yield userDb.findUser(email);
        if (editInfo) {
            return res.status(400).json({ message: '중복된 email 입니다.' });
        }
        const hashPw = yield bcrypt.hash(password).catch((err) => {
            console.log(err);
        });
        yield userDb
            .editUserInfo(Number(userId), email, hashPw, nickname, phone)
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
        console.log(pages);
        console.log(userId);
        const info = yield infoDb.getMyInfos(Number(pages), Number(limit), Number(userId));
        // .catch(() => {
        //   return res
        //     .status(400)
        //     .json({ message: '게시물을 불러오는데 실패하였습니다.' });
        // });
        if (info.count === 0) {
            return res
                .status(406)
                .json({ message: '해당 게시물이 존재하지 않습니다.' });
        }
        return res
            .status(200)
            .json({ info, message: '내가 쓴 게시물을 불러왔습니다.' });
    }),
    usersOrderInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () { }),
    usersRefundInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () { }),
};
