const { Article } = require("../models");
const ArticleRepository = require("../repositorys/article.repository")

class ArticleService {
  articleRepository = new ArticleRepository(Article)

  findAllArticles = async () => {
    return this.articleRepository.findAllArticles()
  }

  postArticle = async(title, contents, user_id) => {
    return this.articleRepository.postArticle(title, contents, user_id)
  }
}

module.exports = ArticleService