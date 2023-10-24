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
exports.searchAllNick = exports.searchByNick = exports.searchAllContent = exports.searchAllTitle = exports.searchByContent = exports.searchByTitle = void 0;
const sequelize_1 = require("sequelize");
const info_1 = __importDefault(require("../models/info"));
const user_1 = __importDefault(require("../models/user"));
function searchByTitle(titles, pages, limit, info_type) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.findAndCountAll({
            order: [['createdAt', 'desc']],
            where: {
                title: {
                    [sequelize_1.Op.like]: '%' + titles + '%',
                },
                type: info_type,
                activate: true,
            },
            limit,
            offset: (pages - 1) * limit,
            attributes: [
                'id',
                [sequelize_1.Sequelize.col('User.nickname'), 'nickname'],
                'title',
                'content',
                'userId',
                'createdAt',
                'updatedAt',
                'targetPoint',
                'type',
                'totalViews',
                'totalLikes',
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
exports.searchByTitle = searchByTitle;
function searchByContent(content, pages, limit, info_type) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.findAndCountAll({
            order: [['createdAt', 'desc']],
            where: {
                content: {
                    [sequelize_1.Op.like]: '%' + content + '%',
                },
                type: info_type,
                activate: true,
            },
            limit,
            offset: (pages - 1) * limit,
            attributes: [
                'id',
                [sequelize_1.Sequelize.col('User.nickname'), 'nickname'],
                'title',
                'content',
                'userId',
                'createdAt',
                'updatedAt',
                'targetPoint',
                'type',
                'totalViews',
                'totalLikes',
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
exports.searchByContent = searchByContent;
function searchAllTitle(titles, pages, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.findAndCountAll({
            order: [['createdAt', 'desc']],
            where: {
                title: {
                    [sequelize_1.Op.like]: '%' + titles + '%',
                },
                activate: true,
            },
            limit,
            offset: (pages - 1) * limit,
            attributes: [
                'id',
                [sequelize_1.Sequelize.col('User.nickname'), 'nickname'],
                'title',
                'content',
                'userId',
                'createdAt',
                'updatedAt',
                'targetPoint',
                'type',
                'totalViews',
                'totalLikes',
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
exports.searchAllTitle = searchAllTitle;
function searchAllContent(content, pages, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.findAndCountAll({
            order: [['createdAt', 'desc']],
            where: {
                content: {
                    [sequelize_1.Op.like]: '%' + content + '%',
                },
                activate: true,
            },
            limit,
            offset: (pages - 1) * limit,
            attributes: [
                'id',
                [sequelize_1.Sequelize.col('User.nickname'), 'nickname'],
                'title',
                'content',
                'userId',
                'createdAt',
                'updatedAt',
                'targetPoint',
                'type',
                'totalViews',
                'totalLikes',
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
exports.searchAllContent = searchAllContent;
function searchByNick(Nickname, pages, limit, info_type) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.findAndCountAll({
            order: [['createdAt', 'desc']],
            where: {
                type: info_type,
                activate: true,
            },
            limit,
            offset: (pages - 1) * limit,
            attributes: [
                'id',
                [sequelize_1.Sequelize.col('User.nickname'), 'nickname'],
                'title',
                'content',
                'userId',
                'createdAt',
                'updatedAt',
                'targetPoint',
                'type',
                'totalViews',
                'totalLikes',
            ],
            include: [
                {
                    model: user_1.default,
                    attributes: [],
                    where: {
                        nickname: {
                            [sequelize_1.Op.like]: '%' + Nickname + '%',
                        },
                    },
                },
            ],
        });
    });
}
exports.searchByNick = searchByNick;
function searchAllNick(nickname, pages, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.findAndCountAll({
            order: [['createdAt', 'desc']],
            limit,
            offset: (pages - 1) * limit,
            where: {
                activate: true,
            },
            attributes: [
                'id',
                [sequelize_1.Sequelize.col('User.nickname'), 'nickname'],
                'title',
                'content',
                'userId',
                'createdAt',
                'updatedAt',
                'targetPoint',
                'type',
                'totalViews',
                'totalLikes',
            ],
            include: [
                {
                    model: user_1.default,
                    attributes: [],
                    where: {
                        nickname: {
                            [sequelize_1.Op.like]: '%' + nickname + '%',
                        },
                    },
                },
            ],
        });
    });
}
exports.searchAllNick = searchAllNick;
