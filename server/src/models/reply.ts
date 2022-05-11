import { BelongsToGetAssociationMixin, DataTypes, Model } from 'sequelize';
import User from './user';
import Info from './info';
import { sequelize } from './sequelize';
import { dbType } from './index';

class Reply extends Model {
  public dataValues!: {
    id: number;
    content: string;
    userId: number;
    infoId: number;
  };
  public readonly id!: number;
  public content!: string;
  public userId!: BelongsToGetAssociationMixin<User>;
  public infoId!: BelongsToGetAssociationMixin<Info>;

  public readonly createdAt!: Date; //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Reply.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING(255),
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
  },
  {
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'Reply',
    tableName: 'Reply',
    paranoid: true,
    // mb4 -> 이모티콘도 사용 가능
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.Reply.belongsTo(db.User, {
    foreignKey: 'userId',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  db.Reply.belongsTo(db.Info, {
    foreignKey: 'infoId',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export default Reply;
