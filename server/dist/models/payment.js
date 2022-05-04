"use strict";
// import { Model } from 'sequelize';
Object.defineProperty(exports, "__esModule", { value: true });
exports.associate = void 0;
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
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class Payment extends sequelize_1.Model {
}
Payment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    state: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id',
        },
    },
    infoId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Info',
            key: 'id',
        },
    },
}, {
    sequelize: sequelize_2.sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'Payment',
    tableName: 'payment',
    paranoid: true,
    // mb4 -> 이모티콘도 사용 가능
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
});
const associate = (db) => {
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
exports.associate = associate;
exports.default = Payment;
