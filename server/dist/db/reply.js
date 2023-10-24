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
exports.getReply = exports.deleteReply = exports.modifyReply = exports.writeReply = void 0;
const reply_1 = __importDefault(require("../models/reply"));
function writeReply(content, userId, infoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield reply_1.default.create({
            content,
            userId,
            infoId,
        });
    });
}
exports.writeReply = writeReply;
function modifyReply(content, userId, infoId, replyId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield reply_1.default.update({
            content,
            userId,
            infoId,
        }, { where: { id: replyId } });
    });
}
exports.modifyReply = modifyReply;
function deleteReply(replyId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield reply_1.default.destroy({
            where: { id: replyId },
        });
    });
}
exports.deleteReply = deleteReply;
function getReply(replyId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield reply_1.default.findOne({
            where: { id: replyId },
        });
    });
}
exports.getReply = getReply;
