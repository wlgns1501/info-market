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
exports.SGEditInfo = exports.BronzeEditInfo = exports.removeInfo = exports.createInfo = exports.getMyInfos = exports.getInfos = exports.getInfo = void 0;
const sequelize_1 = require("sequelize");
const info_1 = __importDefault(require("../models/info"));
const user_1 = __importDefault(require("../models/user"));
function getInfo(infoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.findOne({
            where: { id: infoId },
            attributes: [
                'id',
                [sequelize_1.Sequelize.col('User.nickname'), 'nickname'],
                'title',
                'content',
                'userId',
                'createdAt',
                'updateTimestamp',
                'targetPoint',
                'type',
                'totalViews',
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
exports.getInfo = getInfo;
function getInfos(pages, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.findAndCountAll({
            order: [['createdAt', 'desc']],
            limit,
            offset: (pages - 1) * 10,
            attributes: [
                'id',
                [sequelize_1.Sequelize.col('User.nickname'), 'nickname'],
                'title',
                'content',
                'userId',
                'createdAt',
                'updateTimestamp',
                'targetPoint',
                'type',
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
exports.getInfos = getInfos;
function getMyInfos(pages, limit, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.findAndCountAll({
            order: [['createdAt', 'desc']],
            limit,
            offset: (pages - 1) * 10,
            where: {
                userId,
            },
            attributes: [
                'id',
                [sequelize_1.Sequelize.col('User.nickname'), 'nickname'],
                'title',
                'content',
                'userId',
                'createdAt',
                'updateTimestamp',
                'targetPoint',
                'type',
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
exports.getMyInfos = getMyInfos;
function createInfo(title, content, targetPoint, type, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.create({
            title,
            content,
            targetPoint,
            type,
            userId,
        });
    });
}
exports.createInfo = createInfo;
function removeInfo(infoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.destroy({
            where: { id: infoId },
        });
    });
}
exports.removeInfo = removeInfo;
function BronzeEditInfo(infoId, title, content) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.update({
            title,
            content,
        }, { where: { id: infoId } });
    });
}
exports.BronzeEditInfo = BronzeEditInfo;
function SGEditInfo(infoId, title, content, targetPoint, type) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.update({
            title,
            content,
            targetPoint,
            type,
        }, { where: { id: infoId } });
    });
}
exports.SGEditInfo = SGEditInfo;
