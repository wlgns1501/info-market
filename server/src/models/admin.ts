import { Model } from 'sequelize';

interface AdminAttributes {
  id: number;
  email: string;
  password: string;
  grade: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Admin extends Model<AdminAttributes> implements AdminAttributes {
    public readonly id!: number;
    public email!: string;
    public password!: string;
    public grade!: string;

    public readonly createdAt!: Date; //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
    public readonly updatedAt!: Date;
  }

  Admin.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      grade: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'admin',
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Admin',
      tableName: 'admin',
      paranoid: true,
      // mb4 -> 이모티콘도 사용 가능
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
  );
  return Admin;
};
