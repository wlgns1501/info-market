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

export async function editUserInfo(
  userId: number,
  email: string,
  password: string,
  nickname: string,
) {
  return await User.update(
    {
      email,
      password,
      nickname,
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
