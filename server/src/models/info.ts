import { DataTypes, Model } from 'sequelize';
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
    activate: boolean;
    file: string;
  };

  public readonly id!: number;
  public title!: string;
  public content!: string;
  public targetPoint!: number;
  public type!: string;
  public totalViews?: number;
  public userId!: number;
  public totalLikes?: number;
  public activate?: boolean;
  public file?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
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
      type: DataTypes.TEXT,
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
      defaultValue: 0,
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
      defaultValue: 0,
    },
    activate: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    file: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
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
    //   indexes: [
    //     {
    //       name: 'index_type',
    //       unique: false,
    //       fields: ['type'],
    //     },
    //   ],
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
