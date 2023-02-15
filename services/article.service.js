const { Article, Tag, Article_Tag_Mapping, User } = require("../models");
const ArticleRepository = require("../repositorys/article.repository")

class ArticleService {
  articleRepository = new ArticleRepository(Article, Tag, Article_Tag_Mapping, User)

  findAllArticles = async () => {
    return this.articleRepository.findAllArticles()
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

  patchArticle = async (title, contents, user_id, tags) => {
    const find = await this.articleRepository.findOneArticle(article_id)

  }

  postArticle = async (title, contents, user_id, tags) => {

    if (!title || !contents) {
      return { message: "안 써져있음" }
    }
    const newArticle = await this.articleRepository.createArticle(title, contents, user_id, tags)

    // const TAG = await this.articleRepository.findOrCreate(tags)
    const tag = await Promise.all(tags.map(async (tag) => {
      const a = await this.articleRepository.findOrCreate(tag)
      return a.id
    }))

    const mappings = await Promise.all(tag.map(async (tag) => ({
      tag_id: tag,
      article_id: newArticle.id
    })))

    await this.articleRepository.tagsInstance(mappings)

    return { message: "작성완료" }

  }

}

module.exports = ArticleService