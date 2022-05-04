import { BelongsToManyGetAssociationsMixin, DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from './index';
import User from './user';

class Point extends Model {
  public dataValues!: {
    id: number;
    userId: number;
    point: number;
    status: string;
    tid: string;
    partner_order_id: number;
  };

  public readonly id!: number;
  public userId!: BelongsToManyGetAssociationsMixin<User>;
  public point!: number;
  public state!: string;
  public partner_order_id!: number;
  public readonly tid!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    tid: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    partner_order_id: {
      type: DataTypes.INTEGER,
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
};

export default Point;
