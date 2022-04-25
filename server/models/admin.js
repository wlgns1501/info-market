const Sequelize = require('sequelize');

module.exports = class Admin extends Sequelize.Model {
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
          allowNull: false,
          defaultValue: 'admin',
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Admin',
        tableName: 'admin',
        paranoid: true,
        // mb4 -> 이모티콘도 사용 가능
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
};
