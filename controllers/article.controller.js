const ArticleService = require("../services/article.service");

class ArticleController {
  articleService = new ArticleService();

  findAllArticles = async (req, res) => {
    const articles = await this.articleService.findAllArticles();
    res.json({ articles });
  };


}

module.exports = ArticleController;
