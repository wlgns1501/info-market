"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Admin extends sequelize_1.Model {
    }
    Admin.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        grade: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'admin',
        },
    }, {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Admin',
        tableName: 'admin',
        paranoid: true,
        // mb4 -> 이모티콘도 사용 가능
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    return Admin;
};
