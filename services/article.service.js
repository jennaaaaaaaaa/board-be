const { Article, Tag, Article_Tag_Mapping } = require("../models");
const ArticleRepository = require("../repositorys/article.repository")

class ArticleService {
  articleRepository = new ArticleRepository(Article, Tag, Article_Tag_Mapping)
  findAllArticles = async () => {
    return this.articleRepository.findAllArticles()
  }

  findOneArticle = async (article_id) => {
    return this.articleRepository.findOneArticle(article_id)
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