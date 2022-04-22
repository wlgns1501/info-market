const User = require('../models/user');

module.exports = {
  findUser: async (email) => {
    return await User.findOne({ where: { email } });
  },

  createUser: async (email, hashPw, nickname, phone) => {
    return await User.create({
      email,
      password: hashPw,
      nickname,
      phone,
    });
  },
};
