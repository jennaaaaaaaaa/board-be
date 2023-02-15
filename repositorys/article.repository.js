class ArticleRepository {
  constructor(ArticleModel, TagModel) {
    this.articleModel = ArticleModel;
    this.tagModel = TagModel;
  }

  findAllArticles = async (page) => {
    const { count, rows } = await this.articleModel.findAndCountAll({
      attributes: ["title", "contents", "count"],
      offset: (page - 1) * 8,
      limit: 8,
      order: [["id", "DESC"]],
    });

  
}

module.exports = ArticleRepository;
