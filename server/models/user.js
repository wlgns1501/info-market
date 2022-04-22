const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        grade: {
          type: Sequelize.STRING(50),
          allowNull: true,
          defaultValue: 'Bronze',
        },
        nickname: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        point: {
          type: Sequelize.INTEGER(255),
          allowNull: true,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        // mb4 -> 이모티콘도 사용 가능
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.User.hasMany(db.Info, {
      onDelete: 'CASCADE',
    });
    db.User.hasMany(db.Reply, {
      onDelete: 'CASCADE',
    });
    db.User.belongsToMany(db.Info, {
      through: 'Like',
      onDelete: 'CASCADE',
    });
    db.User.belongsToMany(db.Info, {
      through: 'Payment',
      onDelete: 'CASCADE',
    });
  }
};
