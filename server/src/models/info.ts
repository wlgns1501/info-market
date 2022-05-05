import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  DataTypes,
  Model,
} from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from './index';

class Info extends Model {
  public dataValues!: {
    id: number;
    title: string;
    content: string;
    targetPoint: number;
    type: string;
    totalViews: number;
    userId: number;
    totalLikes: number;
  };
  public readonly id!: number;
  public title!: string;
  public content!: string;
  public targetPoint!: number;
  public type!: string;
  public totalViews?: number;
  public userId!: number;
  public totalLikes!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Info.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    targetPoint: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'Free',
    },
    totalViews: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    totalLikes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0',
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'Info',
    tableName: 'Info',
    paranoid: true,
    // mb4 -> 이모티콘도 사용 가능
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.Info.belongsTo(db.User, {
    foreignKey: 'userId',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  db.Info.hasMany(db.Reply, {
    foreignKey: 'infoId',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  db.Info.hasMany(db.Like, {
    foreignKey: 'infoId',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  db.Info.hasMany(db.Payment, {
    foreignKey: 'infoId',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export default Info;
