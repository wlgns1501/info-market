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
exports.findUserPaidbyUserId = exports.partPointRefund = exports.removePoint = exports.editPoint = exports.findUserChargePoint = exports.createPoint = void 0;
const point_1 = __importDefault(require("../models/point"));
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("../models/user"));
function createPoint(imp_uid, state, userId, point, merchant_uid, payment_method_type) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield point_1.default.create({
            imp_uid,
            state,
            userId,
            point,
            merchant_uid,
            payment_method_type,
        });
    });
}
exports.createPoint = createPoint;
function findUserChargePoint(userId, merchant_uid) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield point_1.default.findOne({
            where: {
                userId,
                merchant_uid,
            },
            attributes: [
                'point',
                'merchant_uid',
                'imp_uid',
                'payment_method_type',
                'createdAt',
                'state',
                [sequelize_1.Sequelize.col('User.nickname'), 'nickname'],
            ],
            include: [
                {
                    model: user_1.default,
                    attributes: [],
                },
            ],
        });
    });
}
exports.findUserChargePoint = findUserChargePoint;
function editPoint(tid) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield point_1.default.update({
            state: 'approve',
        }, {
            where: {
                tid,
            },
        });
    });
}
exports.editPoint = editPoint;
function removePoint(userId, merchant_uid, imp_uid) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield point_1.default.destroy({
            where: {
                userId,
                merchant_uid,
                imp_uid,
            },
        });
    });
}
exports.removePoint = removePoint;
function partPointRefund(userId, merchant_uid, imp_uid, cancel_point) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield point_1.default.update({
            point: cancel_point,
        }, {
            where: {
                userId,
                merchant_uid,
                imp_uid,
            },
        });
    });
}
exports.partPointRefund = partPointRefund;
// export async function findAndUpdate(
//   imp_uid: string,
//   state: string,
//   userId: number,
//   point: number,
//   merchant_uid: string,
//   payment_method_type: string,
// ) {
//   return await Point.({
//     tid,
//     state: '',
//   });
// }
function findUserPaidbyUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield point_1.default.findAll({
            where: {
                userId,
            },
            attributes: [
                'id',
                'state',
                'point',
                [sequelize_1.Sequelize.col('User.nickname'), 'nickname'],
                'createdAt',
                'merchant_uid',
                'imp_uid',
                'payment_method_type',
            ],
            include: {
                model: user_1.default,
                attributes: [],
            },
        });
    });
}
exports.findUserPaidbyUserId = findUserPaidbyUserId;
