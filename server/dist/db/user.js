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
exports.findPkUser = exports.removeUser = exports.AdminEditUserInfo = exports.editUserInfo = exports.findUser = exports.findUsers = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
function createUser(email, hashPw, nickname, phone) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_1.default.create({
            email,
            password: hashPw,
            nickname,
            phone,
        });
    });
}
exports.createUser = createUser;
function findUsers(pages, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_1.default.findAndCountAll({
            order: [['createdAt', 'desc']],
            limit,
            offset: (pages - 1) * 10,
        });
    });
}
exports.findUsers = findUsers;
function findUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_1.default.findOne({
            where: {
                email,
            },
        });
    });
}
exports.findUser = findUser;
function editUserInfo(userId, email, hashPw, nickname, phone) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_1.default.update({
            email,
            password: hashPw,
            nickname,
            phone,
        }, {
            where: {
                id: userId,
            },
        });
    });
}
exports.editUserInfo = editUserInfo;
function AdminEditUserInfo(userId, email, nickname, point, grade) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_1.default.update({
            email,
            nickname,
            point,
            grade,
        }, {
            where: {
                id: userId,
            },
        });
    });
}
exports.AdminEditUserInfo = AdminEditUserInfo;
function removeUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_1.default.destroy({
            where: {
                id: userId,
            },
        });
    });
}
exports.removeUser = removeUser;
function findPkUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_1.default.findOne({
            where: { id: userId },
        });
    });
}
exports.findPkUser = findPkUser;
