// import { Model } from 'sequelize';

// interface PaymentAttribute {
//   state: string;
//   UserId?: string;
//   InfoId?: string;
// }

// module.exports = (sequelize: any, DataTypes: any) => {
//   class Payment extends Model<PaymentAttribute> implements PaymentAttribute {
//     public id!: string;
//     public state!: string;

//     public readonly createdAt!: Date; //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
//     public readonly updatedAt!: Date;
//     public readonly deletedAt!: Date;

//     public static associate(models: any) {
//       Payment.belongsTo(models.User);
//       Payment.belongsTo(models.Info);
//     }
//   }
//   Payment.init(
//     {
//       state: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//       },
//     },
//     {
//       sequelize,
//       timestamps: true,
//       underscored: false,
//       modelName: 'Payment',
//       tableName: 'payment',
//       paranoid: true,
//       // mb4 -> 이모티콘도 사용 가능
//       charset: 'utf8mb4',
//       collate: 'utf8mb4_general_ci',
//     },
//   );
//   return Payment;
// };

import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  DataTypes,
  Model,
} from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from './index';
import User from './user';
import Info from './info';

class Payment extends Model {
  public readonly id!: number;
  public userId!: BelongsToManyGetAssociationsMixin<User>;
  public infoId!: number;
  public state!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
  },
  {
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'Payment',
    tableName: 'payment',
    paranoid: true,
    // mb4 -> 이모티콘도 사용 가능
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
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
