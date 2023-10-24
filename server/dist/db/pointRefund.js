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
exports.findRefund = exports.createPointRefund = void 0;
const pointRefund_1 = __importDefault(require("../models/pointRefund"));
function createPointRefund(imp_uid, merchant_uid, userId, cancel_point, reason, state) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield pointRefund_1.default.create({
            userId,
            reason,
            merchant_uid,
            imp_uid,
            cancel_point,
            state,
        });
    });
}
exports.createPointRefund = createPointRefund;
function findRefund(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield pointRefund_1.default.findAll({
            where: {
                userId,
            },
        });
    });
}
exports.findRefund = findRefund;
