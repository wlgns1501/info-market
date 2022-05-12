import express from 'express';
import passport from 'passport';
const router = express.Router();

//네이버
router.get('/naver', passport.authenticate('naver'));
router.get(
  '/naver/callback',
  passport.authenticate('naver', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/');
  },
);

//카카오
router.get('/kakao', passport.authenticate('kakao'));
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/');
  },
);

module.exports = router;
