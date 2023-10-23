"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class Admin extends sequelize_1.Model {
}
Admin.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    grade: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'admin',
    },
}, {
    sequelize: sequelize_2.sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'Admin',
    tableName: 'Admin',
    paranoid: true,
    // mb4 -> 이모티콘도 사용 가능
    charset: 'utf8',
    collate: 'utf8_general_ci',
});
exports.default = Admin;
