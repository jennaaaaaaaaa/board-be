class ArticleRepository {
  constructor(ArticleModel){
    this.articleModel = ArticleModel
  }

  findAllArticles = async () => {
    return await this.articleModel.findAll()
  }
}

module.exports = ArticleRepository