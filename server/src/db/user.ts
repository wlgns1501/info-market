import User from '../models/user';

export async function createUser(
  email: string,
  hashPw: string,
  nickname: string,
  phone: string,
) {
  return await User.create({
    email,
    password: hashPw,
    nickname,
    phone,
  });
}

export async function findUsers(pages: number, limit: number) {
  return await User.findAndCountAll({
    order: [['createdAt', 'desc']],
    limit,
    offset: (pages - 1) * 10,
  });
}

export async function findUser(email: string) {
  return await User.findOne({
    where: {
      email,
    },
  });
}

export async function editUserEmail(userId: number, email: string) {
  return await User.update(
    {
      email,
    },
    {
      where: {
        id: userId,
      },
    },
  );
}

export async function editUserNickname(userId: number, nickname: string) {
  return await User.update(
    {
      nickname,
    },
    {
      where: {
        id: userId,
      },
    },
  );
}
export async function editUserPhone(userId: number, phone: string) {
  return await User.update(
    {
      phone,
    },
    {
      where: {
        id: userId,
      },
    },
  );
}
export async function editUserPassword(userId: number, hashPw: string) {
  return await User.update(
    {
      password: hashPw,
    },
    {
      where: {
        id: userId,
      },
    },
  );
}

export async function editUserInfo(
  userId: number,
  email: string,
  hashPw: string,
  nickname: string,
  phone: string,
) {
  return await User.update(
    {
      email,
      password: hashPw,
      nickname,
      phone,
    },
    {
      where: {
        id: userId,
      },
    },
  );
}
export async function AdminEditUserInfo(
  userId: number,
  email: string,
  nickname: string,
  point: number,
  grade: string,
) {
  return await User.update(
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
}

export async function removeUser(userId: number) {
  return await User.destroy({
    where: {
      id: userId,
    },
  });
}

export async function findPkUser(userId: number) {
  return await User.findOne({
    where: { id: userId },
  });
}

export async function editUserPoint(userId: number, point: number) {
  return await User.update(
    { point },
    {
      where: {
        id: userId,
      },
    },
  );
}

export async function checkNickname(nickname: string) {
  return await User.findOne({
    where: {
      nickname,
    },
  });
}

export async function postImg(img: string, userId: number) {
  return await User.update(
    { img },
    {
      where: {
        id: userId,
      },
    },
  );
}
