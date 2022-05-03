import Admin from '../models/admin';

export async function findAdminByPK(adminId: number) {
  return await Admin.findOne({
    where: { id: adminId },
  });
}

export async function findAdmin(email: string) {
  return await Admin.findOne({
    where: {
      email,
    },
  });
}

export async function createAdmin(
  email: string,
  hashPw: string,
): Promise<Admin> {
  return await Admin.create({
    email,
    password: hashPw,
  });
}
