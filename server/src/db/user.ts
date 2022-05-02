import db from '../models/index';

type User = {
  id: string;
  email: string;
  password: string;
  nickname: string;
  phone: string;
  point: number;
  grade: string;
};

export async function createUser(
  email: string,
  hashPw: string,
  nickname: string,
  phone: string,
): Promise<User> {
  return await db.User.create({
    email,
    password: hashPw,
    nickname,
    phone,
  });
}

export async function findUsers(pages: number, limit: number) {
  return await db.User.findAndCountAll({
    limit,
    offset: (pages - 1) * 10,
  });
}

export async function findUser(email: string): Promise<User | null> {
  return await db.User.findOne({
    where: {
      email,
    },
  });
}

export async function editUserInfo(
  userId: string,
  email: string,
  password: string,
  nickname: string,
): Promise<void> {
  return await db.User.update(
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
  userId: string,
  email: string,
  nickname: string,
  point: number,
  grade: string,
): Promise<string | null> {
  return await db.User.update(
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

export async function removeUser(userId: string): Promise<void> {
  return await db.User.destroy({
    where: {
      id: userId,
    },
  });
}

export async function findPkUser(userId: string): Promise<User | undefined> {
  return await db.User.findOne({
    id: userId,
  });
}
