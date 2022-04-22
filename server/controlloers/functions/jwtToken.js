const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
  // token으로 sign
  generateAccessToken: (data) => {
    return jwt.sign({ data }, config.jwt.secret_key, {
      expiresIn: config.jwt.expiresIN,
    });
  },
  generateRefreshToken: () => {
    return jwt.sign({}, config.jwt.secret_key, {
      expiresIn: config.jwt.expiresIN,
    });
  },
  // JWT 토큰을 쿠키로 전달
  sendToken: (res, accessToken, refreshToken) => {
    const cookieOptions = {
      httpOnly: true,
    };
    res.cookie('accessToken', accessToken, cookieOptions);
    res.cookie('refreshToken', refreshToken, cookieOptions);
  },
  // JWT 토큰 정보를 받아서 검증
  checkToken: (token) => {
    try {
      return jwt.verify(token, process.env.secretKey);
    } catch (err) {
      return null;
    }
  },
};
