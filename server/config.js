const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  jwt: {
    secret_key: process.env.JWT_SECRET,
<<<<<<< HEAD
    expiresIn: process.env.JWT_EXPIRES_IN,
=======
    expiresIN: String(process.env.EXPIRES_IN),
>>>>>>> ce2eddf13291afbe0cb3a0acd6345b9f8c9d6f62
  },
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS),
  },
};
