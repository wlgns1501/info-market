import { BelongsToGetAssociationMixin, DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from './index';
import User from './user';
import Info from './info';

class Payment extends Model {
  public dataValues!: {
    id: number;
    userId: number;
    infoId: number;
    state: string;
    tid: number;
  };

  public readonly id!: number;
  public userId!: BelongsToGetAssociationMixin<User>;
  public infoId!: BelongsToGetAssociationMixin<Info>;
  public state!: string;
  public readonly tid!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Payment.init(
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
    infoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Info',
        key: 'id',
      },
    },
    tid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'Payment',
    tableName: 'Payment',
    paranoid: true,
    // mb4 -> 이모티콘도 사용 가능
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.Payment.belongsTo(db.User, {
    foreignKey: 'userId',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  db.Payment.belongsTo(db.Info, {
    foreignKey: 'infoId',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export default Payment;
