import db from '../models/index';

type Admin = {
  id: number;
  email: string;
  password: string;
  grade: string;
};

export async function findAdminByPK(adminId: number): Promise<Admin | void> {
  return await db.Admin.findOne({
    where: adminId,
  });
}

export async function findAdmin(email: string): Promise<Admin | undefined> {
  return await db.Admin.findOne({
    where: email,
  });
}

export async function createAdmin(
  email: string,
  hashPw: string,
): Promise<Admin> {
  return await db.Admin.create({
    email,
    password: hashPw,
  });
}
