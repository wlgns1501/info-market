// import express from 'express';
// import passport from 'passport';
// const {
//   Strategy: NaverStrategy,
//   Profile: NaverProfile,
// } = require('passport-naver');
// import * as userDb from '../db/user';
// const bcrypt = require('../controlloers/functions/bcrypt');
// const User = require('../models/user');
// require('dotenv').config();

// module.exports = () => {
//   passport.use(
//     new NaverStrategy(
//       {
//         clientID: process.env.NAVER_ID,
//         clientSecret: process.env.NAVER_SECRET,
//         callbackURL: '/oauth/naver/callback',
//       },
//       async (accessToken: any, refreshToken: any, profile: any, done: any) => {
//         console.log('naver profile', profile);
//         try {
//           const exUser = await User.findOne({
//             where: { email: profile.email },
//           });
//           if (exUser) {
//             done(null, exUser);
//           } else {
//             const newUser = await User.create({
//               email: profile.email,
//               password: profile.password,
//             });
//             done(null, newUser);
//           }
//         } catch (error) {
//           console.error(error);
//           done(error);
//         }
//       },
//     ),
//   );
// };
