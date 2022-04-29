'use strict';

import { Model } from 'sequelize';

interface InfoAttribute {
  id: number;
  title: string;
  content: string;
  targetPoint: number;
  type: string;
  totalViews: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Info extends Model<InfoAttribute> implements InfoAttribute {
    public readonly id!: number;
    public title!: string;
    public content!: string;
    public targetPoint!: number;
    public type!: string;
    public totalViews!: number;

    public readonly createdAt!: Date; //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    public static associate(models: any) {
      Info.belongsTo(models.User, {
        onDelete: 'CASCADE',
      });
      Info.hasMany(models.Reply, {
        onDelete: 'CASCADE',
      });
      Info.belongsToMany(models.User, {
        through: 'Like',
        onDelete: 'CASCADE',
      });
      Info.belongsToMany(models.User, {
        through: 'Payment',
        onDelete: 'CASCADE',
      });
    }
  }
  Info.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    },
    {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Info',
      tableName: 'info',
      paranoid: true,
      // mb4 -> 이모티콘도 사용 가능
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
  );
  return Info;
};
