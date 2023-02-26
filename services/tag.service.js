const { Tag, Article_Tag_Mapping, Article, User } = require("../models");
const TagRepository = require("../repositorys/tag.repository");
const client = require("../util/redis");

class TagService {
  tagRepository = new TagRepository(Tag, Article_Tag_Mapping, Article, User);

  tags = async () => {
    const Allcount = await this.tagRepository.countTag();
    const top10 = Allcount.sort((a, b) => {
      return b.count - a.count;
    }).slice(0, 10);

    let arr = []
    await Promise.all(
      top10.map(async (tag) => {
        const name = await this.tagRepository.findTag(tag.tag_id);
        return arr.push(name.tag);
      })
    );
    
    return arr.join();
  };

  redis = (async () => {
    while (true) {
      const todayTop10 = await this.tags();

      await new Promise((resolve) => {
        client.FLUSHALL();
        client.set("todayTags", todayTop10)
        setTimeout(resolve, 86400000);
      });
    }
  })();

  getRedis = async () => {
    const tag = await client.get("todayTags")
    if (tag) {
      return tag.split(",");
    }

    const Allcount = await this.tagRepository.countTag();
    const top10 = Allcount.sort((a, b) => {
      return b.count - a.count;
    }).slice(0, 10);

    let result = []
    await Promise.all(
      top10.map(async (tag) => {
        const name = await this.tagRepository.findTag(tag.tag_id);
        return result.push(name.tag)
      })
    );

    return result
  };

  findArticleByTag = async (tag) => {
    const searchArticles = await this.tagRepository.findArticleByTag(tag);
    const articles = searchArticles.Article_Tag_Mappings;
    const mappingArticle = articles.map((article) => {
      return {
        id : article.Article.id,
        title: article.Article.title,
        contents: article.Article.contents,
        count: article.Article.count,
        author: !article.Article.User? "탈퇴한 회원" : article.Article.User.email,
        createdAt: article.Article.createdAt,
      };
    });

    return {mappingArticle, searchTag : searchArticles.tag};
  };
}

module.exports = TagService;
