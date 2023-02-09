'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Article_tag }) {
      // define association here
      this.belongsTo(User, { foreignKey: "user_id"});
    }
  }
  Article.init({
    title: DataTypes.STRING,
    contents: DataTypes.STRING,
    count: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};