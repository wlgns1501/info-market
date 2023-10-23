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
const paymentDb = __importStar(require("../db/payment"));
module.exports = {
    orderInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { infoId } = req.params;
        const { restPoint, userId } = req.body;
        let state = 'ready';
        const tid = Math.floor(Math.floor(new Date().getTime() / 1000) + Math.floor(Math.random()));
        // console.log(tid);
        if (userId !== Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            return res.status(403).json({ message: '유저가 일치하지 않습니다.' });
        }
        const info = yield infoDb.getInfo(Number(infoId));
        if (!info) {
            return res
                .status(406)
                .json({ message: '해당 게시물이 존재하지 않습니다.' });
        }
        if (info.userId === userId) {
            return res
                .status(400)
                .json({ message: '자신의 게시물은 구매할 수 없습니다.' });
        }
        const user = yield userDb.findPkUser(Number(userId));
        const { point } = user;
        if (point < info.targetPoint) {
            return res.status(400).json({ message: '포인트가 부족 합니다.' });
        }
        state = 'paid';
        yield paymentDb.createPayment(userId, Number(infoId), state, tid);
        yield userDb.editUserPoint(userId, restPoint);
        return res
            .status(200)
            .json({ message: '해당 게시물을 구매하는데 성공하였습니다.' });
    }),
    refundInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const { infoId } = req.params;
        const info = yield infoDb.getInfo(Number(infoId));
        if (!info) {
            return res
                .status(406)
                .json({ message: '해당 게시물이 존재하지 않습니다.' });
        }
        const user = yield userDb.findPkUser(Number(req.userId));
        const payment = yield paymentDb.getPayment(Number(infoId));
        if (((_b = req.user) === null || _b === void 0 ? void 0 : _b.id) !== (payment === null || payment === void 0 ? void 0 : payment.userId)) {
            return res.status(403).json({ message: '유저가 일치하지 않습니다.' });
        }
        if (!payment) {
            return res
                .status(400)
                .json({ message: '해당 게시물을 구매하지 않았습니다.' });
        }
        yield userDb.editUserPoint(user.id, info.targetPoint);
        yield paymentDb.refundPayment(payment.tid);
        return res.status(200).json({ message: '환불 완료 했습니다.' });
    }),
};
