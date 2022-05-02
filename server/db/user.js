const User = require('../models/user');

module.exports = {
  findUsers: async (pages, limit) => {
    return await User.findAndCountAll({
      limit: Number(limit),
      offset: (pages - 1) * 10,
    });
  },
  findUser: async (userId) => {
    return await User.findByPk({
      where: {
        id: userId,
      },
    });
  },
  editUserInfo: async (userId, email, nickname, point, grade) => {
    const user = await User.update(
      {
        email,
        nickname,
        point,
        grade,
      },
      {
        where: {
          id: userId,
        },
      },
    );
    return user;
  },
  removeUser: async (userId) => {
    return await User.destroy({
      where: {
        id: userId,
      },
    });
  },
};
