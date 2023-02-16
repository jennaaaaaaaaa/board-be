const ArticleService = require("../services/article.service");

class ArticleController {
  articleService = new ArticleService();

  findAllArticles = async (req, res) => {
    const page = req.query.page || 1;
    const { rows, firstPage, lastPage, totalPage } =
      await this.articleService.findAllArticles(page);
    res.json({ rows, firstPage, lastPage, totalPage });
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

    title = !title ? article.title : title
    contents = !contents ? article.contents : contents
    tags = !tags ? article.tags : tags



    if (article.tags !== tags) {
      await this.articleService.mappingsDel(article_id)
    }





    await this.articleService.patchArticle()


    // const article = await
  }

  //게시글 삭제
}

//수정 (태그를 수정하냐, 게시글을 수정하냐)
//
//상세 조회 아티클 아이디로 아이디와 업데이티트 엣 태그 유저 이름
//매핑에 아티클

module.exports = ArticleController;

// 수정시 맵핑 테이블 에서 둘다 들ㅇ고 와서 태그 같은지 확인하고 타이틀 콘텐츠 같은지 확인하고
// 태그가 다르다면 맵핑 테이블에서 where :article_id 를 destroy(다 지움)하고 맵핑 태이블에
// 태그를 다시 인설트 insert

//삭제하고 findorcreate, tagsInstance => update

// const title = req.body.title || article.title
// const contents = req.body.contents || article.contents

// await updateArticle(id, title, contents)