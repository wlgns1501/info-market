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
exports.findUser = exports.likeClickCancel = exports.likeClick = void 0;
const like_1 = __importDefault(require("../models/like"));
function likeClick(userId, infoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield like_1.default.create({
            userId,
            infoId,
        });
    });
}
exports.likeClick = likeClick;
function likeClickCancel(userId, infoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield like_1.default.destroy({
            where: { userId, infoId },
        });
    });
}
exports.likeClickCancel = likeClickCancel;
function findUser(userId, infoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield like_1.default.findOne({
            where: { userId, infoId },
        });
    });
}
exports.findUser = findUser;
