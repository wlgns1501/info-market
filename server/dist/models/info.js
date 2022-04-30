'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Info extends sequelize_1.Model {
        static associate(models) {
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
    Info.init({
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
    }, {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Info',
        tableName: 'info',
        paranoid: true,
        // mb4 -> 이모티콘도 사용 가능
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    return Info;
};
