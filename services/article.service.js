const { Article } = require("../models");
const ArticleRepository = require("../repositorys/article.repository")

class ArticleService {
  articleRepository = new ArticleRepository(Article)

  findAllArticles = async () => {
    return this.articleRepository.findAllArticles()
  }

  
}

module.exports = ArticleService