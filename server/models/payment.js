const Sequelize = require('sequelize');

module.exports = class Payment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        state: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Payment',
        tableName: 'payment',
        paranoid: true,
        // mb4 -> 이모티콘도 사용 가능
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.Payment.belongsTo(db.User);
    db.Payment.belongsTo(db.Info);
  }
};
