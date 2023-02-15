const ArticleService = require("../services/article.service");

class ArticleController {
  articleService = new ArticleService();

  findAllArticles = async (req, res) => {
    const articles = await this.articleService.findAllArticles();
    res.json({ articles });
  };

  postArticle = async (req, res) => {
    const { title, contents } = req.body;
    const { id: user_id } = res.locals.user;

    const post = await this.articleService.postArticle(
      title,
      contents,
      user_id
    );

    res.json(post);
  };
}

module.exports = ArticleController;
