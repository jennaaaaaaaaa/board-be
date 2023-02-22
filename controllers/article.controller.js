const ArticleService = require("../services/article.service");

class ArticleController {
  articleService = new ArticleService();

  findAllArticles = async (req, res) => {
    const page = req.query.page || 1;
    const { articles, firstPage, lastPage, totalPage } =
      await this.articleService.findAllArticles(page);
    res.json({ articles, firstPage, lastPage, totalPage });
  };

  postArticle = async (req, res) => {
    const { title, contents, tags } = req.body;
    const { id: user_id } = res.locals.user;

    const unique = Array.from(new Set(tags))
    const replaceTags = await Promise.all(unique.map((tag) => tag.replace(/\s/g, "")))

    const { message } = await this.articleService.postArticle(
      title,
      contents,
      user_id,
      replaceTags
    );

    res.json({ message: message })
  };

  //게시글 상세 조회
  findOneArticle = async (req, res) => {
    const { id: article_id } = req.params

    const oneArticle = await this.articleService.findOneArticle(article_id)

    if (!oneArticle) {
      return res.json({ message: "게시글 없음" })
    }

    res.json({ data: oneArticle })
  }

  //게시글 수정
  patchArticle = async (req, res) => {

    if (!res.locals.user) {
      return res.status(500).json({ message: "로그인 하세요" })
    }

    const { id: user_id } = res.locals.user;
    const { id: article_id } = req.params
    const { title, contents, tags } = req.body;

    const {status, message} = await this.articleService.patchArticle(article_id, title, contents, tags, user_id)

    res.status(status).json(message)

  }

  //게시글 삭제

  deleteArticle = async (req, res) => {

    if (!res.locals.user) {
      return res.status(500).json({ message: "로그인 하세요" })
    }

    const { id: user_id } = res.locals.user;
    const { id: article_id } = req.params

    await this.articleService.mappingsDel(article_id, user_id)
    const {status,message} = await this.articleService.deleteArticle(article_id, user_id)
    await this.articleService.deleteComment(article_id)

    res.status(status || 200).json(message)

  }
}

module.exports = ArticleController;