const { Article, Tag, Article_Tag_Mapping, User } = require("../models");
const ArticleRepository = require("../repositorys/article.repository")

class ArticleService {
  articleRepository = new ArticleRepository(Article, Tag, Article_Tag_Mapping, User)

  findAllArticles = async (page) => {
    const { count, rows } = await this.articleRepository.findAllArticles(page)

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
    return {
      rows,
      firstPage,
      lastPage,
      totalPage
    }
  }

  findOneArticle = async (article_id) => {
    const article = await this.articleRepository.findOneArticle(article_id)

    let tags = []
    for (let i = 0; i < article.Article_Tag_Mappings.length; i++) {
      tags.push(article.Article_Tag_Mappings[i].Tag.tag) //push 배열에 추가
    }
    return { email: article.User.email, title: article.title, contents: article.contents, createdAt: article.createdAt, count: article.count, tags }
  }

  findTagByArticle = async (article_id) => {
    const article = await this.articleRepository.findTagByArticle(article_id)
  }

  patchArticle = async (article_id, tag_id) => {
    const find = await this.articleRepository.findOneArticle(article_id, tag_id)

    if (find.tag_id !== req.body.tags) {
      await this.articleRepository.mappingsDel(article_id)

      const tag = await Promise.all(tags.map(async (tag) => {
        const tagFindCreate = await this.articleRepository.findOrCreate(tag)
        return tagFindCreate.id
      }))

      const updateArticle = await this.articleRepository.updateArticle(title, contents, mappings, email)

      const mappings = await Promise.all(tag.map(async (tag) => ({
        tag_id: tag,
        article_id: updateArticle.id
      })))

      await this.articleRepository.tagsInstance(mappings)
    }
    return { message: "수정완료" }

  }

  postArticle = async (title, contents, user_id, tags) => {

    if (!title || !contents) {
      return { message: "안 써져있음" }
    }
    const newArticle = await this.articleRepository.createArticle(title, contents, user_id, tags)

    // const TAG = await this.articleRepository.findOrCreate(tags)
    const tag = await Promise.all(tags.map(async (tag) => {
      const tagFindCreate = await this.articleRepository.findOrCreate(tag)

      return tagFindCreate.id
    }))

    const mappings = await Promise.all(tag.map(async (tag) => ({
      tag_id: tag,
      article_id: newArticle.id
    })))

    await this.articleRepository.tagsInstance(mappings)

    return { message: "작성완료" }

  }

  mappingsDel = async (article_id) => {
    return await this.articleRepository.mappingsDel(article_id)
  }


}

module.exports = ArticleService

// 수정시 맵핑 테이블 에서 둘다 들ㅇ고 와서 태그 같은지 확인하고 타이틀 콘텐츠 같은지 확인하고
// 태그가 다르다면 맵핑 테이블에서 where :article_id 를 destroy(다 지움)하고 맵핑 태이블에
// 태그를 다시 인설트 insert

//삭제하고 findorcreate, tagsInstance => update

// const title = req.body.title || article.title
// const contents = req.body.contents || article.contents

// const modifyTitle = title || article.title

// await updateArticle(id, title, contents)