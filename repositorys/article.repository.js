class ArticleRepository {
  constructor(ArticleModel, UserModel) {
    this.articleModel = ArticleModel;
    this.userModel = UserModel;
  }

  findAllArticles = async (page) => {
    const { count, rows } = await this.articleModel.findAndCountAll({
      attributes: ["title", "contents", "count", "createdAt"],
      offset: (page - 1) * 8,
      limit: 8,
      order: [["id", "DESC"]],
      include: [{model: this.userModel, attributes: ["email"]}]
    });

    return { count, rows };
  };
}

module.exports = ArticleRepository;
