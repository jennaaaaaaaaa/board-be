const ArticleService = require("../services/article.service");

class ArticleController {
  articleService = new ArticleService();

  findAllArticles = async (req, res) => {
    const page = req.query.page || 1;
    const { rows, firstPage, lastPage, totalPage } =
      await this.articleService.findAllArticles(page);
    res.json({ rows, firstPage, lastPage, totalPage });
  };
}

module.exports = ArticleController;
