// import { Model } from 'sequelize';

// interface ReplyAttribute {
//   content: string;
//   UserId?: string;
//   InfoId?: string;
// }

// module.exports = (sequelize: any, DataTypes: any) => {
//   class Reply extends Model<ReplyAttribute> implements ReplyAttribute {
//     public readonly id!: string;
//     public content!: string;

//     public readonly createdAt!: Date; //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
//     public readonly updatedAt!: Date;
//     public readonly deletedAt!: Date;

//     public static associate(models: any) {
//       Reply.belongsTo(models.User);
//       Reply.belongsTo(models.Info);
//     }
//   }
//   Reply.init(
//     {
//       content: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//       },
//     },
//     {
//       sequelize,
//       timestamps: true,
//       underscored: false,
//       modelName: 'Reply',
//       tableName: 'reply',
//       paranoid: true,
//       // mb4 -> 이모티콘도 사용 가능
//       charset: 'utf8mb4',
//       collate: 'utf8mb4_general_ci',
//     },
//   );
//   return Reply;
// };

import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationsMixin,
  DataTypes,
  Model,
} from 'sequelize';
import User from './user';
import Info from './info';
import { sequelize } from './sequelize';
import { dbType } from './index';

class Reply extends Model {
  public readonly id!: number;
  public content!: string;
  public userId!: BelongsToManyGetAssociationsMixin<User>;
  public infoId!: BelongsToManyGetAssociationsMixin<Info>;

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
    tableName: 'reply',
    paranoid: true,
    // mb4 -> 이모티콘도 사용 가능
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
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
