const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  jwt: {
    secret_key: process.env.JWT_SECRET,
    expiresIN: String(process.env.EXPIRES_IN),
  },
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS),
  },
};
