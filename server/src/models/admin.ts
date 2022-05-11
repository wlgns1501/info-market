import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';

class Admin extends Model {
  public dataValues!: {
    id: number;
    email: string;
    password: string;
    grade: string;
  };
  public readonly id!: number;
  public email!: string;
  public password!: string;
  public grade!: string;

  public readonly createdAt!: Date; //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
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
    tableName: 'Admin',
    paranoid: true,
    // mb4 -> 이모티콘도 사용 가능
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export default Admin;
