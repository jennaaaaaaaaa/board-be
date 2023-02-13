class MainRepository {
  constructor(ArticleModel, TagModel) {
    this.articleModel = ArticleModel;
    this.tagModel = TagModel;
  }

  findAllArticles = async () => {
    return await this.articleModel.findAll({
      attributes: ["title", "contents", "count"],
    });
  };

  
}

module.exports = MainRepository;
