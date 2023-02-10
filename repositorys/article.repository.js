class ArticleRepository {
  constructor(ArticleModel) {
    this.articleModel = ArticleModel;
  }

  findAllArticles = async () => {
    return await this.articleModel.findAll({
      attributes: ["title", "contents", "count"],
    });
  };

  postArticle = async (title, contents, user_id) => {
    return await this.articleModel.create({ title, contents, user_id });
  };
}

module.exports = ArticleRepository;
