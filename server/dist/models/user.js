'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Info, {
                onDelete: 'CASCADE',
            });
            User.hasMany(models.Reply, {
                onDelete: 'CASCADE',
            });
            User.belongsToMany(models.Info, {
                through: 'Like',
                onDelete: 'CASCADE',
            });
            User.belongsToMany(models.Info, {
                through: 'Payment',
                onDelete: 'CASCADE',
            });
        }
    }
    User.init({
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
            allowNull: true,
            defaultValue: 'Bronze',
        },
        nickname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        point: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
    }, {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        // mb4 -> 이모티콘도 사용 가능
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    return User;
};
