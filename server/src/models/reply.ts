import { Model } from 'sequelize';

interface ReplyAttribute {
  content: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Reply extends Model<ReplyAttribute> implements ReplyAttribute {
    public readonly id!: string;
    public content!: string;

    public readonly createdAt!: Date; //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    public static associate(models: any) {
      Reply.belongsTo(models.User);
      Reply.belongsTo(models.Info);
    }
  }
  Reply.init(
    {
      content: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Reply',
      tableName: 'reply',
      paranoid: true,
      // mb4 -> 이모티콘도 사용 가능
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
  );
  return Reply;
};
