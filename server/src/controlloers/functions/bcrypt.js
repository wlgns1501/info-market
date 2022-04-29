const bcrypt = require('bcrypt');
const config = require('../../config');

module.exports = {
  hash: async (password) => {
    return await bcrypt.hash(password, config.bcrypt.saltRounds);
  },
  comparePw: async (password, hashPw) => {
    return await bcrypt.compare(password, hashPw);
  },
};
