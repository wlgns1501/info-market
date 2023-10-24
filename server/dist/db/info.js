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
exports.likeInfo = exports.recentInfo = exports.findPaidInfo = exports.findFreeInfo = exports.editInfoFile = exports.activateInfo = exports.adminEditInfo = exports.LikesSub = exports.LikesAdd = exports.viewsAdd = exports.SGEditInfo = exports.BronzeEditInfo = exports.removeInfo = exports.createInfo = exports.getMyInfos = exports.AdminGetInfo = exports.getInfos = exports.getInfo = void 0;
const sequelize_1 = require("sequelize");
const reply_1 = __importDefault(require("../models/reply"));
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
                'targetPoint',
                'type',
                'file',
                'totalViews',
                'totalLikes',
            ],
            include: [
                {
                    model: user_1.default,
                    attributes: [],
                },
                {
                    model: reply_1.default,
                    attributes: ['id', 'userid', 'content', 'createdAt'],
                    include: [
                        {
                            model: user_1.default,
                            attributes: ['nickname'],
                        },
                    ],
                },
            ],
        });
    });
}
exports.getInfo = getInfo;
function getInfos() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.findAll({
            order: [['totalLikes', 'desc']],
            limit: 10,
            attributes: [
                'id',
                [sequelize_1.Sequelize.col('User.nickname'), 'nickname'],
                'title',
                'content',
                'userId',
                'createdAt',
                'updatedAt',
                'targetPoint',
                'activate',
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
exports.getInfos = getInfos;
function AdminGetInfo(pages, limit, activate) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.findAndCountAll({
            order: [['createdAt', 'desc']],
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
                'activate',
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
            where: {
                activate,
            },
        });
    });
}
exports.AdminGetInfo = AdminGetInfo;
function getMyInfos(pages, limit, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.findAndCountAll({
            order: [['createdAt', 'desc']],
            limit,
            offset: (pages - 1) * limit,
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
                'updatedAt',
                'targetPoint',
                'type',
                'totalViews',
                'totalLikes',
                'activate',
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
function createInfo(title, content, targetPoint, type, userId, activate, file) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.create({
            title,
            content,
            targetPoint,
            type,
            userId,
            activate,
            file,
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
function BronzeEditInfo(infoId, title, content, file) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.update({
            title,
            content,
            file,
        }, { where: { id: infoId } });
    });
}
exports.BronzeEditInfo = BronzeEditInfo;
function SGEditInfo(infoId, title, content, targetPoint, type, file) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.update({
            title,
            content,
            targetPoint,
            type,
            file,
        }, { where: { id: infoId } });
    });
}
exports.SGEditInfo = SGEditInfo;
function viewsAdd(infoId, views) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.update({
            totalViews: views + 1,
        }, {
            where: {
                id: infoId,
            },
        });
    });
}
exports.viewsAdd = viewsAdd;
function LikesAdd(infoId, likes) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.update({
            totalLikes: likes + 1,
        }, {
            where: {
                id: infoId,
            },
        });
    });
}
exports.LikesAdd = LikesAdd;
function LikesSub(infoId, likes) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.update({
            totalLikes: likes - 1,
        }, {
            where: {
                id: infoId,
            },
        });
    });
}
exports.LikesSub = LikesSub;
function adminEditInfo(infoId, title, content, targetPoint, type, activate) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.update({
            title,
            content,
            targetPoint,
            type,
            activate,
        }, {
            where: {
                id: infoId,
            },
        });
    });
}
exports.adminEditInfo = adminEditInfo;
function activateInfo(activate, infoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.update({
            activate,
        }, {
            where: {
                id: infoId,
            },
        });
    });
}
exports.activateInfo = activateInfo;
function editInfoFile(infoId, file) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.update({
            file,
        }, {
            where: {
                id: infoId,
            },
        });
    });
}
exports.editInfoFile = editInfoFile;
function findFreeInfo(pages, limit, like, cursor) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.findAndCountAll({
            order: [
                ['createdAt', 'desc'],
                ['totalLikes', like],
            ],
            limit,
            attributes: [
                'id',
                [sequelize_1.Sequelize.col('User.nickname'), 'nickname'],
                'title',
                'content',
                'userId',
                'createdAt',
                'updatedAt',
                'targetPoint',
                'activate',
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
            where: {
                id: { [sequelize_1.Op.lt]: cursor },
                type: 'Free',
            },
        });
    });
}
exports.findFreeInfo = findFreeInfo;
function findPaidInfo(pages, limit, like_type, activate, cursor) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.findAndCountAll({
            order: [
                ['createdAt', 'desc'],
                ['totalLikes', like_type],
            ],
            limit,
            attributes: [
                'id',
                [sequelize_1.Sequelize.col('User.nickname'), 'nickname'],
                'title',
                'content',
                'userId',
                'createdAt',
                'updatedAt',
                'targetPoint',
                'activate',
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
            where: {
                id: { [sequelize_1.Op.lt]: cursor },
                activate,
                type: 'Paid',
            },
        });
    });
}
exports.findPaidInfo = findPaidInfo;
function recentInfo(pages, limit, type) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.findAndCountAll({
            order: [['createdAt', 'desc']],
            limit,
            attributes: [
                'id',
                [sequelize_1.Sequelize.col('User.nickname'), 'nickname'],
                'title',
                'content',
                'userId',
                'createdAt',
                'updatedAt',
                'targetPoint',
                'activate',
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
            where: {
                type,
                activate: true,
            },
        });
    });
}
exports.recentInfo = recentInfo;
function likeInfo(pages, limit, like, type) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield info_1.default.findAndCountAll({
            order: [['totalLikes', like]],
            limit,
            attributes: [
                'id',
                [sequelize_1.Sequelize.col('User.nickname'), 'nickname'],
                'title',
                'content',
                'userId',
                'createdAt',
                'updatedAt',
                'targetPoint',
                'activate',
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
            where: {
                type,
                activate: true,
            },
        });
    });
}
exports.likeInfo = likeInfo;
