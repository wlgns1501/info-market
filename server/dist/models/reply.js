"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Reply extends sequelize_1.Model {
        static associate(models) {
            Reply.belongsTo(models.User);
            Reply.belongsTo(models.Info);
        }
    }
    Reply.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Reply',
        tableName: 'reply',
        paranoid: true,
        // mb4 -> 이모티콘도 사용 가능
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    return Reply;
};
