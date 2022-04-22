const express = require('express');
const router = express.Router();
const authControllers = require('../controlloers/auth');
//const { signup, login } = require('../controlloers/auth');

// 로그인
router.post('/login', authControllers.login);
// 로그아웃
// router.post('/logout', authControllers.logout);
// 회원가입
router.post('/signup', authControllers.signup);
// 회원탈퇴
// router.delete('/:userId', authControllers.remove);

module.exports = router;
