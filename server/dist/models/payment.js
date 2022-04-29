"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Payment extends sequelize_1.Model {
        static associate(models) {
            Payment.belongsTo(models.User);
            Payment.belongsTo(models.Info);
        }
    }
    Payment.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        state: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    }, {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Payment',
        tableName: 'payment',
        paranoid: true,
        // mb4 -> 이모티콘도 사용 가능
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    return Payment;
};
