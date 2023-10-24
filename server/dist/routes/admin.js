"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
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
// router.post('/newtoken', auth.newAcc);
// 게시물 관리
router.get('/info', auth.me, adminInfoControllers.getInfo);
router.put('/info/:infoId', auth.me, adminInfoControllers.editInfo);
router.delete('/info', auth.me, adminInfoControllers.removeInfo);
router.put('/info/:infoId/activate', auth.me, adminInfoControllers.activateInfo);
module.exports = router;
