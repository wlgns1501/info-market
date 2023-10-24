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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pointDb = __importStar(require("../db/point"));
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const userDb = __importStar(require("../db/user"));
const pointRefundDb = __importStar(require("../db/pointRefund"));
module.exports = {
    getToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res.status(200).json({
            imp_cid: config_1.config.imp.imp_cid,
            imp_code: config_1.config.imp.imp_code,
            message: 'cid와 secret code 입니다.',
        });
    }),
    approve: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const imp_key = config_1.config.imp.imp_key;
        const imp_secret = config_1.config.imp.imp_secret;
        const url = 'https://api.iamport.kr/users/getToken';
        const { userId } = req;
        const user = yield userDb.findPkUser(Number(userId));
        if (!user) {
            return res.status(403).json({ message: '유저가 존재하지 않습니다.' });
        }
        let userPoint = user.point;
        if (!req.body.imp_uid) {
            return res.status(400).json({ message: '결제 번호를 받지 못했습니다.' });
        }
        if (!req.body.merchant_uid) {
            return res.status(400).json({ message: '주문 번호를 받지 못했습니다.' });
        }
        const pointCharge = yield pointDb.createPoint(req.body.imp_uid, req.body.status, Number(userId), req.body.amount, req.body.merchant_uid, req.body.pay_method);
        const response = yield axios_1.default
            .post(url, {
            imp_key,
            imp_secret,
        }, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .catch((err) => {
            return res
                .status(400)
                .json({ message: 'iamport 토큰을 받아오는데 실패하였습니다.' });
        });
        const imp_token = response.data.response.access_token;
        const complete_url = `https://api.iamport.kr/payments/${pointCharge.imp_uid}`;
        const getPaymentData = yield (0, axios_1.default)({
            url: complete_url,
            method: 'get',
            headers: { Authorization: imp_token },
        }).catch((err) => {
            console.log(err);
        });
        const paymentData = getPaymentData.req.body;
        const order = yield pointDb.findUserChargePoint(Number(userId), paymentData.merchant_uid);
        const amountToBePaid = order === null || order === void 0 ? void 0 : order.point;
        const { amount, status } = paymentData;
        if (amount === amountToBePaid) {
            // await pointDb.findAndUpdate(merchant_uid,  )
            switch (status) {
                case 'ready':
                    break;
                case 'paid':
                    userPoint += pointCharge.point;
                    yield userDb.editUserPoint(Number(userId), userPoint);
                    return res
                        .status(200)
                        .json({ status: 'success', message: '결제에 성공하였습니다.' });
            }
        }
        else {
            return res.status(400).json({ message: '위조된 결제시도가 있습니다.' });
        }
    }),
    cancel: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const imp_key = config_1.config.imp.imp_key;
        const imp_secret = config_1.config.imp.imp_secret;
        const url = 'https://api.iamport.kr/users/getToken';
        const { userId } = req;
        const user = yield userDb.findPkUser(Number(userId));
        if (!user) {
            return res.status(403).json({ message: '유저가 존재하지 않습니다.' });
        }
        if (!req.body.merchant_uid) {
            return res.status(400).json({ message: '주문 번호를 받지 못했습니다.' });
        }
        const response = yield axios_1.default
            .post(url, {
            imp_key,
            imp_secret,
        }, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .catch((err) => {
            return res
                .status(400)
                .json({ message: 'iamport 토큰을 받아오는데 실패하였습니다.' });
        });
        const imp_token = response.data.response.access_token;
        const payment = yield pointDb.findUserChargePoint(Number(req.userId), req.body.merchant_uid);
        if (!payment) {
            return res
                .status(406)
                .json({ message: '포인트를 결제한 내역이 없습니다.' });
        }
        const paymentData = payment;
        const { merchant_uid, reason, cancel_point } = req.body;
        const cancelablePoint = paymentData.point - cancel_point;
        if (cancelablePoint < 0) {
            return res
                .status(400)
                .json({ message: '환불할 금액이 구매한 금액 보다 큽니다.' });
        }
        const getCancelData = yield axios_1.default
            .post('https://api.iamport.kr/payments/cancel', {
            reason,
            imp_uid: paymentData.imp_uid,
            amount: cancel_point,
            checksum: cancelablePoint,
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: imp_token,
            },
        })
            .catch((err) => {
            return res.status(400).json({ message: '환불 하는데 실패하였습니다.' });
        });
        const { responses } = getCancelData.data;
        if (cancelablePoint === 0) {
            yield pointDb.removePoint(Number(req.userId), paymentData.merchant_uid, paymentData.imp_uid);
            const pointRefund = yield pointRefundDb.createPointRefund(paymentData.imp_uid, merchant_uid, Number(req.userId), cancel_point, reason, 'AllRefund');
        }
        else {
            yield pointDb.partPointRefund(Number(req.userId), paymentData.merchant_uid, paymentData.imp_uid, cancelablePoint);
            const pointRefund = yield pointRefundDb.createPointRefund(paymentData.imp_uid, merchant_uid, Number(req.userId), cancel_point, reason, 'PartRefund');
        }
        return res
            .status(200)
            .json({ result: responses, message: '환불 하는데 성공하였습니다.' });
    }),
};
// 10000원 -> 10000원 paid
// 5000원 -> 5000원 partRefund
