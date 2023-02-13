class ArticleRepository {
  constructor(ArticleModel) {
    this.articleModel = ArticleModel;
  }

  findAllArticles = async () => {
    return await this.articleModel.findAll({
      attributes: ["title", "contents", "count"],
    });
  };

  
}

module.exports = ArticleRepository;
