import { BelongsToGetAssociationMixin, DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from './index';
import User from './user';
import Point from './point';

class PointRefund extends Model {
  public dataValues!: {
    id: number;
    userId: number;
    pointId: number;
    cancel_point: number;
    state: string;
    imp_uid: string;
    merchant_uid: string;
    reason: string;
  };

  public readonly id!: number;
  public userId!: BelongsToGetAssociationMixin<User>;
  public pointId!: BelongsToGetAssociationMixin<Point>;
  public cancel_point!: number;
  public readonly imp_uid!: string;
  public readonly merchant_uid!: string;
  public state!: string;
  public reason!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

PointRefund.init(
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
    pointId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Point',
        key: 'id',
      },
    },
    cancel_point: {
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
      unique: true,
    },
    reason: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'PointRefund',
    tableName: 'PointRefund',
    paranoid: true,
    // mb4 -> 이모티콘도 사용 가능
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.PointRefund.belongsTo(db.User, {
    foreignKey: 'userId',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  db.PointRefund.belongsTo(db.Point, {
    foreignKey: 'pointId',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export default PointRefund;
