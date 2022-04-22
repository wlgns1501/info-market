const express = require('express');
const router = express.Router();
const adminUserControllers = require('../controlloers/adminUser');
const adminInfoControllers = require('../controlloers/adminInfo');

// 유저 관리
router.get('/users', adminUserControllers.getUsers);
router.put('/users/:userId', adminUserControllers.editUserInfo);
router.delete('/users/:userId', adminUserControllers.removeUser);

// 게시물 관리
router.get('/info', adminInfoControllers.getInfo);
router.put('/info/:infoId', adminInfoControllers.editInfo);
router.delete('/info', adminInfoControllers.removeInfo);

module.exports = router;
