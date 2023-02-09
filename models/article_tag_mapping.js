'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article_Tag_Mapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Tag, Article }) {
      // define association here
      this.belongsTo(Tag, { foreignKey: "tag_id", targetKey: "id" });
      this.belongsTo(Article, { foreignKey: "article_id", sourceKey: "id" });
    }
  }
  Article_Tag_Mapping.init({
    article_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Article_Tag_Mapping',
  });
  return Article_Tag_Mapping;
};