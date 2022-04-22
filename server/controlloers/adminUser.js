const userDb = require('../db/user.js');

module.exports = {
  getUsers: async (req, res) => {
    const { pages, limit } = req.params;

    const users = await userDb.findUsers(pages, limit).catch(() => {
      return res
        .status(400)
        .json({ message: '회원 정보를 불러오는데 실패했습니다.' });
    });

    if (users.count === 0) {
      return res.status(406).json({ message: '유저가 존재하지 않습니다.' });
    }

    res.status(200).json({ users, message: '가입한 유저들을 불러왔습니다.' });
  },
  editUserInfo: async (req, res) => {
    const { userId } = req.params;
    const { email, nickname, point, grade } = req.body;
    const user = await userDb.findPkUser(userId);

    if (!user) {
      return res.status(406).message({ message: '유저가 존재하지 않습니다.' });
    }

    const editUser = await userDb
      .editUserInfo(userId, email, nickname, point, grade)
      .catch(() => {
        return res
          .status(400)
          .json({ message: '회원 정보를 수정하는데 실패했습니다.' });
      });

    res
      .status(200)
      .json({ editUser, message: '해당 유저의 정보를 수정 했습니다.' });
  },
  removeUser: async (req, res) => {
    const { userId } = req.params;

    const user = await userDb.findUser(userId);

    if (!user) {
      return res.status(406).message({ message: '유저가 존재하지 않습니다.' });
    }

    await userDb.removeUser(userId).catch(() => {
      return res
        .status(400)
        .json({ message: '회원을 삭제 하는데 실패했습니다.' });
    });

    res.status(200).json({ message: '해당 유저를 삭제했습니다.' });
  },
};
