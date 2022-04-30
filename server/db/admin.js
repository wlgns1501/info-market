const Admin = require('../models/admin');

module.exports = {
  createUser: async (email, hashPw) => {
    return await Admin.create({
      email,
      password: hashPw,
    });
  },
  findPkUser: async (userId) => {
    return await Admin.findOne({
      where: {
        id: userId,
      },
      attributes: [
        'id',
        'email',
        'grade',
        'createdAt',
        'updatedAt',
        'deletedAt',
      ],
    });
  },
  findUser: async (email) => {
    return await Admin.findOne({ where: { email } });
  },
};
