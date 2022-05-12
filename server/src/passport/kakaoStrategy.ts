import express from 'express';
import passport from 'passport';
const { Strategy: KakaoStrategy } = require('passport-kakao');
import * as userDb from '../db/user';
const bcrypt = require('../controlloers/functions/bcrypt');
const User = require('../models/user');
require('dotenv').config();

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: '/oauth/kakao/callback',
      },
      async (accessToken: any, refreshToken: any, profile: any, done: any) => {
        console.log('kakao profile', profile);
        console.log(typeof profile.id);
        try {
          const exUser = await User.findOne({
            where: { email: profile.email },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile.email,
              password: profile.password,
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};
