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
const infoDb = __importStar(require("../db/info"));
const likeDb = __importStar(require("../db/like"));
module.exports = {
    like: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { infoId } = req.params;
        const { userId } = req;
        const userInfo = yield userDb.findPkUser(Number(userId));
        const likeInfo = yield likeDb.findUser(Number(userId), Number(infoId));
        console.log(userInfo);
        console.log(likeInfo);
        if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.id) === (likeInfo === null || likeInfo === void 0 ? void 0 : likeInfo.userId)) {
            return res.status(403).json({ message: '이미 추천한 게시물입니다.' });
        }
        yield likeDb.likeClick(Number(userId), Number(infoId));
        const info = yield infoDb.getInfo(Number(infoId));
        // console.log(info.id);
        // console.log(info?.totalLikes);
        yield infoDb.LikesAdd(info.id, Number(info.totalLikes));
        return res.status(200).json({ message: '해당 게시물을 추천했습니다.' });
    }),
    likeCancel: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { infoId } = req.params;
        const { userId } = req;
        const userInfo = yield userDb.findPkUser(userId);
        const likeInfo = yield likeDb.findUser(Number(userId), Number(infoId));
        console.log(userInfo);
        console.log(likeInfo);
        if (userInfo !== null && likeInfo === null) {
            return res
                .status(403)
                .json({ message: '이미 추천을 취소한 게시물입니다.' });
        }
        yield likeDb.likeClickCancel(userId, Number(infoId));
        const info = yield infoDb.getInfo(Number(infoId));
        yield infoDb.LikesSub(info.id, Number(info.totalLikes));
        return res
            .status(200)
            .json({ message: '해당 게시물의 추천을 취소했습니다.' });
    }),
};
