import express from 'express';
const router = express.Router();
const authControllers = require('../controlloers/auth');
const authMe = require('../middlewares/auth');
// 로그인
router.post('/login', authControllers.login);
// 로그아웃
router.post('/logout', authMe.me, authControllers.logout);
// 회원가입
router.post('/signup', authControllers.signup);
// 회원탈퇴
router.delete('/:userId', authMe.me, authControllers.remove);

router.post('/newtoken', authMe.newAcc);

module.exports = router;
