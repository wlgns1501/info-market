import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  jwt: {
    secret_key: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  bcrypt: {
    saltRounds: process.env.BCRYPT_SALT_ROUNDS,
  },
};
