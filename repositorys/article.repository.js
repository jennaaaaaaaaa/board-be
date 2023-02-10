class ArticleRepository {
  constructor(ArticleModel) {
    this.articleModel = ArticleModel;
  }

  findAllArticles = async () => {
    return await this.articleModel.findAll({
      attributes: ["title", "contents", "count"],
    });
  };

  findOneArticle = async (id) => {
    return await this.articleModel.findByPk(id)
  }
}

module.exports = ArticleRepository;
