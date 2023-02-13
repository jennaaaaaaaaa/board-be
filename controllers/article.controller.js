const ArticleService = require("../services/article.service");

class ArticleController {
  articleService = new ArticleService();

  findAllArticles = async (req, res) => {
    const articles = await this.articleService.findAllArticles();
    res.json({ articles });
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

  findOneArticle = async (req, res) => {
    const { id: article_id } = req.params


    const oneArticle = await this.articleService.findOneArticle(article_id)

    if (!oneArticle) {
      return res.json({ message: "게시글 없음" })
    }

    res.json({ data: oneArticle })

  }

  // patchArticle = async (req, res) => {


  // }
}

//수정 (태그를 수정하냐, 게시글을 수정하냐)
//
//상세 조회 아티클 아이디로 아이디와 업데이티트 엣 태그 유저 이름
//매핑에 아티클

module.exports = ArticleController;
