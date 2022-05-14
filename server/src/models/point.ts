import { BelongsToGetAssociationMixin, DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from './index';
import User from './user';

class Point extends Model {
  public dataValues!: {
    id: number;
    userId: number;
    point: number;
    state: string;
    imp_uid: string;
    merchant_uid: string;
    payment_method_type: string;
  };

  public readonly id!: number;
  public userId!: BelongsToGetAssociationMixin<User>;
  public point!: number;
  public state!: string;
  public readonly imp_uid!: string;
  public readonly merchant_uid!: string;
  public payment_method_type!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Point.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    merchant_uid: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    imp_uid: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    payment_method_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'Point',
    tableName: 'Point',
    paranoid: true,
    // mb4 -> 이모티콘도 사용 가능
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.Point.belongsTo(db.User, {
    foreignKey: 'userId',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  db.Point.hasMany(db.PointRefund, {
    foreignKey: 'pointId',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export default Point;
