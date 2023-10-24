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
exports.getUserPayment = exports.getPayments = exports.refundPayment = exports.getPayment = exports.createPayment = void 0;
const payment_1 = __importDefault(require("../models/payment"));
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("../models/user"));
const info_1 = __importDefault(require("../models/info"));
function createPayment(userId, infoId, state, tid) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield payment_1.default.create({
            userId,
            infoId,
            state,
            tid,
        });
    });
}
exports.createPayment = createPayment;
function getPayment(infoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield payment_1.default.findOne({
            where: {
                id: infoId,
            },
            attributes: [
                'id',
                [sequelize_1.Sequelize.col('User.nickname'), 'nickname'],
                [sequelize_1.Sequelize.col('Info.title'), 'title'],
                [sequelize_1.Sequelize.col('Info.content'), 'content'],
                [sequelize_1.Sequelize.col('Info.targetPoint'), 'targetPoint'],
                [sequelize_1.Sequelize.col('Info.totalViews'), 'totalViews'],
                [sequelize_1.Sequelize.col('Info.totalLikes'), 'totalLikes'],
                'userId',
                'infoId',
                'tid',
            ],
            include: [
                {
                    model: user_1.default,
                    attributes: [],
                },
                {
                    model: info_1.default,
                    attributes: [],
                },
            ],
        });
    });
}
exports.getPayment = getPayment;
function refundPayment(tid) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield payment_1.default.update({
            state: 'refund',
        }, {
            where: {
                tid,
            },
        });
    });
}
exports.refundPayment = refundPayment;
function getPayments(userId, pages, limit, state) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield payment_1.default.findAndCountAll({
            where: {
                id: userId,
                state,
            },
            limit,
            offset: (pages - 1) * 10,
            order: [['createdAt', 'desc']],
            attributes: [
                'id',
                [sequelize_1.Sequelize.col('User.nickname'), 'nickname'],
                [sequelize_1.Sequelize.col('Info.title'), 'title'],
                [sequelize_1.Sequelize.col('Info.content'), 'content'],
                [sequelize_1.Sequelize.col('Info.targetPoint'), 'targetPoint'],
                [sequelize_1.Sequelize.col('Info.totalViews'), 'totalViews'],
                [sequelize_1.Sequelize.col('Info.totalLikes'), 'totalLikes'],
                'state',
                'tid',
                'userId',
                'infoId',
                'createdAt',
            ],
            include: [
                {
                    model: user_1.default,
                    attributes: [],
                },
                {
                    model: info_1.default,
                    attributes: [],
                },
            ],
        });
    });
}
exports.getPayments = getPayments;
function getUserPayment(infoId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield payment_1.default.findOne({
            where: {
                userId,
                infoId,
            },
        });
    });
}
exports.getUserPayment = getUserPayment;
