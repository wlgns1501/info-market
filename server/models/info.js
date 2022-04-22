const Sequelize = require('sequelize');

module.exports = class Info extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        targetPoint: {
          type: Sequelize.INTEGER(255),
          allowNull: false,
        },
        type: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        totalViews: {
          type: Sequelize.INTEGER(255),
          allowNull: false,
          defaultValue: '0',
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Info',
        tableName: 'info',
        paranoid: true,
        // mb4 -> 이모티콘도 사용 가능
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.Info.belongsTo(db.User, {
      onDelete: 'CASCADE',
    });
    db.Info.hasMany(db.Reply, {
      onDelete: 'CASCADE',
    });
    db.Info.belongsToMany(db.User, {
      through: 'Like',
      onDelete: 'CASCADE',
    });
    db.Info.belongsToMany(db.User, {
      through: 'Payment',
      onDelete: 'CASCADE',
    });
  }
};
