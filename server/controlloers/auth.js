const bcrypt = require('bcrypt');
const config = require('../config');
const userDb = require('../db/user');
const {
  generateAccessToken,
  sendToken,
  generateRefreshToken,
} = require('./functions/jwtToken');

module.exports = {
  signup: async (req, res) => {
    const { email, password, nickname, phone } = req.body;
    // 벡엔드에서 위 값들이 비어 있을 시 예외처리를 해주는 코드 추가하기.
    // 이메일 유효성 검사
    // const regEmail =
    //   /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // if (!regEmail.test(email)) {
    //   return res.status().send('협의할 부분 ~~~~~~~');
    // }
    console.log(req.body);
    const exUser = await userDb.findUser(email);
    if (exUser) {
      return res.status(409).send('중복된 유저 입니다.');
    }

    try {
      /*
      // 포스트맨 테스트용
      {
        "email": "test@naver.com",
        "password": "1234",
        "nickname": "CS18",
        "phone": "010-1234-5678"
      }
      */
      const hashPw = await bcrypt.hash(password, config.bcrypt.saltRounds);
      // const grade = 'bronze';
      // const point = 100;
      const test = await userDb.createUser(email, hashPw, nickname, phone);
      console.log(test);
      return res.status(201).json({
        id: test.id,
        message: '회원가입에 성공 했습니다.',
      });
    } catch (error) {
      console.error(error);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
      const userInfo = await userDb.findUser();
      if (!userInfo) {
        console.log('해당 유저 X');
        return res.status(401).send('해당 유저가 없습니다.');
      }

      // npm문서에서 bcrypt 관련 내용 찾아보기
      const verification = await bcrypt.compare(password, userInfo.password);
      if (!verification) {
        console.log('비밀번호가 일치 X');
        return res.satus(400).send('비밀번호가 일치하지 않음');
      }

      // const userId = await User.findOne({
      //   where: { id: userInfo.id },
      //   // attributes: ['email', 'grade', 'nickname', 'phone', 'point'],
      // });
      // 토큰 [id(PK), grade)]생성하고 전달.
      const userToken = generateAccessToken(userInfo.email);
      // id, token, point, grade, message
      return res.status(201).json(userToken);
    } catch (error) {
      console.error(error);
    }
  },
};
