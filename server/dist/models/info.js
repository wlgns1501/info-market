"use strict";
// 'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.associate = void 0;
// import { Model } from 'sequelize';
// interface InfoAttribute {
//   title: string;
//   content: string;
//   targetPoint: number;
//   type: string;
//   totalViews: number;
//   UserId?: string;
// }
// module.exports = (sequelize: any, DataTypes: any) => {
//   class Info extends Model<InfoAttribute> implements InfoAttribute {
//     public readonly id!: string;
//     public title!: string;
//     public content!: string;
//     public targetPoint!: number;
//     public type!: string;
//     public totalViews!: number;
//     public UserId!: string;
//     public readonly createdAt!: Date; //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
//     public readonly updatedAt!: Date;
//     public readonly deletedAt!: Date;
//     public static associate(models: any) {
//       Info.belongsTo(models.User, {
//         onDelete: 'CASCADE',
//         foreignKey: 'UserId',
//       });
//       Info.hasMany(models.Reply, {
//         onDelete: 'CASCADE',
//       });
//       Info.belongsToMany(models.User, {
//         through: 'Like',
//         onDelete: 'CASCADE',
//       });
//       Info.belongsToMany(models.User, {
//         through: 'Payment',
//         onDelete: 'CASCADE',
//       });
//     }
//   }
//   Info.init(
//     {
//       title: {
//         type: DataTypes.STRING(100),
//         allowNull: false,
//       },
//       content: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//       },
//       targetPoint: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 0,
//       },
//       type: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//         defaultValue: 'Free',
//       },
//       totalViews: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         defaultValue: '0',
//       },
//       // UserId: {
//       //   type: DataTypes.STRING(10),
//       //   allowNull: false,
//       //   references: {
//       //     model: 'users',
//       //     key: 'id',
//       //   },
//       // },
//     },
//     {
//       sequelize,
//       timestamps: true,
//       underscored: false,
//       modelName: 'Info',
//       tableName: 'info',
//       paranoid: true,
//       // mb4 -> 이모티콘도 사용 가능
//       charset: 'utf8mb4',
//       collate: 'utf8mb4_general_ci',
//     },
//   );
//   return Info;
// };
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class Info extends sequelize_1.Model {
}
Info.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    targetPoint: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    type: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'Free',
    },
    totalViews: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: '0',
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id',
        },
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'Info',
    tableName: 'info',
    charset: 'utf8',
    collate: 'utf8_general_ci',
    freezeTableName: true,
    timestamps: true,
    updatedAt: 'updateTimestamp',
});
const associate = (db) => {
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
    db.Info.belongsToMany(db.User, {
        foreignKey: 'infoId',
        sourceKey: 'id',
        through: 'Like',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    db.Info.belongsToMany(db.User, {
        foreignKey: 'infoId',
        sourceKey: 'id',
        through: 'Payment',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
};
exports.associate = associate;
exports.default = Info;
