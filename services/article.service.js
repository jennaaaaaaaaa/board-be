const { Article, User } = require("../models");
const ArticleRepository = require("../repositorys/article.repository");

class ArticleService {
  articleRepository = new ArticleRepository(Article, User);

  findAllArticles = async (page) => {
    const { count, rows } = await this.articleRepository.findAllArticles(page);

    // 총 페이지 수 : 한 페이지당 8개의 주문내역
    let totalPage = Math.ceil(count / 8);

    // 화면에 보여줄 그룹 : 한 그룹당 보여줄 페이지 5개
    let pageGroup = Math.ceil(page / 5);

    // 한 그룹의 마지막 페이지 번호
    let lastPage = pageGroup * 5;

    // 한 그룹의 첫 페이지 번호
    let firstPage = lastPage - 5 + 1 <= 0 ? 1 : lastPage - 5 + 1;

    // 만약 마지막 페이지 번호가 총 페이지 수 보다 크다면?
    if (lastPage > totalPage) {
      lastPage = totalPage;
    }

    const articles = rows.map((row) => {
      return { id : row.id, title : row.title, contents : row.contents, count: row.count, author: row.User.email, createdAt: row.createdAt };
    });

    return {
      articles,
      firstPage,
      lastPage,
      totalPage,
    };
  };
}

module.exports = ArticleService;
