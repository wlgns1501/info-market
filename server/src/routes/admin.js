const express = require('express');
const router = express.Router();
const adminUserControllers = require('../controlloers/adminUser');
const adminInfoControllers = require('../controlloers/adminInfo');
const auth = require('../middlewares/auth');

// 유저 관리
router.post('/signup', adminUserControllers.adminSignUp);
router.post('/login', adminUserControllers.adminLogin);
router.post('/logout', auth.me, adminUserControllers.adminLogOut);
router.get('/users', auth.me, adminUserControllers.getUsers);
router.put('/users/:userId', auth.me, adminUserControllers.editUserInfo);
router.delete('/users/:userId', auth.me, adminUserControllers.removeUser);

router.post('/newtoken', auth.newAcc);

// 게시물 관리
// router.get('/info', adminInfoControllers.getInfo);
// router.put('/info/:infoId', adminInfoControllers.editInfo);
// router.delete('/info', adminInfoControllers.removeInfo);

module.exports = router;
