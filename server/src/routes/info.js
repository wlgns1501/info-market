const express = require('express');
const router = express.Router();
const infoControllers = require('../controlloers/info');
const replyControllers = require('../controlloers/reply');
const orderControllers = require('../controlloers/order');

// 게시물 info.js
// router.get('/:infoId', 인증 ,infoControllers.getInfo);
// router.post('/', infoControllers.writeInfo);
// router.delete('/:infoId', infoControllers.removeInfo);
// router.put('/:infoId', infoControllers.putInfo);

// // 댓글 reply.js
// router.post('/:infoId/reply', replyControllers.writeReply);
// router.put('/:infoId/reply/:replyId', replyControllers.putReply);
// router.delete('/:infoId/reply/:replyId', replyControllers.removeReply);

// // 게시물 구매 order.js
// router.post('/:infoId/order', orderControllers.orderInfo);
// router.delete('/:infoId/refund', orderControllers.refundInfo);

module.exports = router;
