import express from 'express';
const router = express.Router();
const usersControllers = require('../controlloers/users');
const auth = require('../middlewares/auth');

// router.get('/:userId', auth.me, usersControllers.getUsersInfo);
// router.put('/:userId', auth.me, usersControllers.editUsersInfo);
router.get('/userinfo/:userId', auth.me, usersControllers.getUsersInfo);
router.put('/userinfo/:userId', auth.me, usersControllers.editUsersInfo);
router.get('/info', auth.me, usersControllers.usersWriteInfo);
router.get('/info/order', auth.me, usersControllers.usersOrderInfo);
router.get('/info/refund', auth.me, usersControllers.usersRefundInfo);
router.post('/:userId/img', auth.me, usersControllers.postImg);
router.get('/nickname', usersControllers.checkNickname);
router.get('/:userId/point', usersControllers.paidPoint);
router.get('/email', auth.me, usersControllers.checkEmail);

module.exports = router;
