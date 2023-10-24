"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const infoControllers = require('../controlloers/info');
const replyControllers = require('../controlloers/reply');
const orderControllers = require('../controlloers/order');
const likeControllers = require('../controlloers/like');
const auth = require('../middlewares/auth');
// 게시물 info.js
router.get('/:infoId', infoControllers.getInfo);
router.post('/', auth.me, infoControllers.writeInfo);
router.delete('/:infoId', auth.me, infoControllers.removeInfo);
router.put('/:infoId', auth.me, infoControllers.putInfo);
router.get('/', infoControllers.getInfoes);
router.put('/:infoId/file', auth.me, infoControllers.editFile);
router.get('/free/list', infoControllers.getFreeInfo);
router.get('/paid/list', infoControllers.getPaidInfo);
// 추천 like.js
router.put('/:infoId/like', auth.me, likeControllers.like);
router.delete('/:infoId/like', auth.me, likeControllers.likeCancel);
// 댓글 reply.js
router.post('/:infoId/reply', auth.me, replyControllers.writeReply);
router.put('/:infoId/reply/:replyId', auth.me, replyControllers.putReply);
router.delete('/:infoId/reply/:replyId', auth.me, replyControllers.removeReply);
// 게시물 구매 order.js
router.post('/:infoId/order', auth.me, orderControllers.orderInfo);
router.put('/:infoId/refund', auth.me, orderControllers.refundInfo);
module.exports = router;
