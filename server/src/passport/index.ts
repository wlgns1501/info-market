// import passport from 'passport';
// const naver = require('./naverStrategy');
// const kakao = require('./kakaoStrategy');
// const User = require('../models/user');

// module.exports = () => {
//   passport.serializeUser((user, done) => {
//     console.log(user);
//     done(null, user);
//     //done(null, user.id);
//   });
//   passport.deserializeUser((id, done) => {
//     User.findOne({ where: { id } })
//       .then((user: boolean | Express.User | null | undefined) =>
//         done(null, user),
//       )
//       .catch((err: any) => done(err));
//   });

//   //local();
//   naver();
//   kakao();
// };
