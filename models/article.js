"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Article_Tag_Mapping }) {
      // define association here
      this.belongsTo(User, { foreignKey: "user_id" });
      this.hasMany(Article_Tag_Mapping, { foreignKey: "article_id" });
    }
  }
  Article.init(
    {
      title: DataTypes.STRING,
      contents: DataTypes.STRING,
      count: { type: DataTypes.INTEGER, defaultValue: 0 },
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
