import Admin from '../models/admin';

export async function findAdminByPK(adminId: number): Promise<Admin | null> {
  return await Admin.findOne({
    where: { id: adminId },
  });
}

export async function findAdmin(email: string): Promise<Admin | null> {
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
