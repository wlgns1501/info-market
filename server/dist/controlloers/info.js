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
const infoDb = __importStar(require("../db/info"));
const paymentDb = __importStar(require("../db/payment"));
const likeDb = __importStar(require("../db/like"));
module.exports = {
    getInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { infoId } = req.params;
        if (!infoId) {
            return res.status(401).json({ message: '게시물을 선택하지 않았습니다.' });
        }
        const info = yield infoDb.getInfo(Number(infoId));
        if (!info) {
            return res.status(406).json({ message: '해당 게시물이 없습니다.' });
        }
        yield infoDb.viewsAdd(info.id, Number(info.totalViews));
        if (req.query.userId) {
            let isPurchased;
            const checkPay = yield paymentDb.getUserPayment(Number(infoId), Number(req.query.userId));
            if (!checkPay) {
                isPurchased = false;
            }
            else {
                isPurchased = true;
            }
            const like = yield likeDb.findUser(Number(req.query.userId), Number(infoId));
            return res.status(200).json({
                info,
                like: like ? true : false,
                isPurchased,
                message: '게시물을 가져왔습니다.',
            });
        }
        return res.status(200).json({ info, message: '게시물을 가져왔습니다.' });
    }),
    writeInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, content, targetPoint, type } = req.body;
        const { userId, grade } = req;
        let activate;
        if (!title) {
            return res
                .status(400)
                .json({ message: '게시물의 제목이 입력되지 않았습니다.' });
        }
        if (!content) {
            return res
                .status(400)
                .json({ message: '게시물의 본문이 입력되지 않았습니다.' });
        }
        if (type !== 'Free' && grade === 'Bronze') {
            return res.status(403).json({ message: '회원 등급에 맞지 않습니다.' });
        }
        if (type === 'Free' && Number(targetPoint) !== 0) {
            return res
                .status(403)
                .json({ message: '해당 게시물은 무료 게시물 입니다.' });
        }
        if (type === 'Free') {
            activate = true;
        }
        else {
            activate = false;
        }
        const info = yield infoDb.createInfo(title, content, targetPoint, type, userId, activate, req.body.file);
        return res
            .status(203)
            .json({ infoId: info, message: '게시물이 생성 되었습니다.' });
    }),
    removeInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { infoId } = req.params;
        const { userId } = req;
        const info = yield infoDb.getInfo(Number(infoId));
        if (!info) {
            return res.status(406).json({ message: '해당 게시물이 없습니다.' });
        }
        if (userId !== info.userId) {
            return res.status(403).json({ message: '유저가 일치하지 않습니다.' });
        }
        yield infoDb.removeInfo(Number(infoId));
        return res.status(200).json({ message: '게시물이 삭제 되었습니다.' });
    }),
    putInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { infoId } = req.params;
        const { userId, grade } = req;
        const info = yield infoDb.getInfo(Number(infoId));
        // console.log(grade);
        if (!info) {
            return res
                .status(406)
                .json({ message: '해당 게시물이 존재하지 않습니다.' });
        }
        if (userId !== info.userId) {
            return res.status(403).json({ message: '유저가 일치하지 않습니다.' });
        }
        // const { title, content, type, targetPoint } = req.body;
        if (grade === 'Bronze' &&
            req.body.type === 'Free' &&
            req.body.targetPoint === 0) {
            const info = yield infoDb.BronzeEditInfo(infoId, req.body.title, req.body.content, req.body.file);
            // console.log(info);
            return res.status(200).json({ message: ' 게시물이 수정되었습니다.' });
        }
        else if (grade !== 'Bronze') {
            const info = yield infoDb.SGEditInfo(infoId, req.body.title, req.body.content, req.body.targetPoint, req.body.type, req.body.file);
            return res.status(200).json({ message: ' 게시물이 수정되었습니다.' });
        }
        return res.status(403).json({
            message: '해당 회원 등급은 유료 게시물로 변경 할 수 없습니다.',
        });
    }),
    // 무한스크롤 / 인기순 10개
    getInfoes: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const infoes = yield infoDb.getInfos();
        if (!infoes) {
            return res.status(406).json({ message: '게시물이 존재하지 않습니다.' });
        }
        return res.status(200).json({
            info: infoes,
            message: `인기 게시물들을 가져왔습니다.`,
        });
    }),
    editFile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { infoId } = req.params;
        const { userId } = req;
        const info = yield infoDb.getInfo(Number(infoId));
        if (!info) {
            return res
                .status(406)
                .json({ message: '해당 게시물이 존재하지 않습니다.' });
        }
        if (info.userId != userId) {
            return res.status(403).json({ message: '유저가 일치하지 않습니다.' });
        }
        yield infoDb.editInfoFile(Number(infoId), req.body.file);
    }),
    getFreeInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // 없으면 undefined가 온다.
        let { pages, limit, like_type } = req.query;
        let cursor;
        let like = 'desc';
        if (like_type === 'false') {
            like = 'asc';
        }
        if (Number(req.query.lastId) === 0) {
            if (like_type === 'false') {
                const recentInfo = yield infoDb.recentInfo(Number(pages), Number(limit), 'Free');
                if (!recentInfo) {
                    return res
                        .status(406)
                        .json({ message: '게시물이 존재하지 않습니다.' });
                }
                return res
                    .status(200)
                    .json({ info: recentInfo, message: '무료 게시물을 가져왔습니다.' });
            }
            else {
                const recentInfo = yield infoDb.likeInfo(Number(pages), Number(limit), like, 'Free');
                if (!recentInfo) {
                    return res
                        .status(406)
                        .json({ message: '게시물이 존재하지 않습니다.' });
                }
                return res
                    .status(200)
                    .json({ info: recentInfo, message: '무료 게시물을 가져왔습니다.' });
            }
        }
        cursor = Number(req.query.lastId);
        const freeInfo = yield infoDb.findFreeInfo(Number(pages), Number(limit), like, Number(cursor));
        if (freeInfo.count === 0) {
            return res.status(406).json({ message: '게시물이 존재하지 않습니다.' });
        }
        return res.status(200).json({
            info: freeInfo,
            message: `${pages} 번 페이지 게시물들을 불러왔습니다.`,
        });
    }),
    getPaidInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let { pages, limit, like_type } = req.query;
        const activate = true;
        let cursor;
        let like = 'desc';
        if (like_type === 'false') {
            like = 'asc';
        }
        if (Number(req.query.lastId) === 0) {
            if (Number(req.query.lastId) === 0) {
                if (like_type === 'false') {
                    const recentInfo = yield infoDb.recentInfo(Number(pages), Number(limit), 'Paid');
                    if (!recentInfo) {
                        return res
                            .status(406)
                            .json({ message: '게시물이 존재하지 않습니다.' });
                    }
                    return res
                        .status(200)
                        .json({ info: recentInfo, message: '유료 게시물을 가져왔습니다.' });
                }
                else {
                    const recentInfo = yield infoDb.likeInfo(Number(pages), Number(limit), like, 'Paid');
                    if (!recentInfo) {
                        return res
                            .status(406)
                            .json({ message: '게시물이 존재하지 않습니다.' });
                    }
                    return res
                        .status(200)
                        .json({ info: recentInfo, message: '유료 게시물을 가져왔습니다.' });
                }
            }
        }
        cursor = Number(req.query.lastId);
        const paidInfo = yield infoDb.findPaidInfo(Number(pages), Number(limit), like, activate, Number(cursor));
        if (paidInfo.count === 0) {
            return res.status(406).json({ message: '게시물이 존재하지 않습니다.' });
        }
        return res.status(200).json({
            info: paidInfo,
            message: `${pages} 번 페이지 게시물들을 불러왔습니다.`,
        });
    }),
};
