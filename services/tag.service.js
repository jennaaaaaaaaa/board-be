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

    const names = await Promise.all(
      top10.map(async (tag) => {
        const name = await this.tagRepository.findTag(tag.tag_id);
        return { name: name.tag };
      })
    );

    return names;
  };

  redis = (async () => {
    while (true) {
      const todayTop10 = await this.tags();

      await new Promise((resolve) => {
        for (let i = 0; i < todayTop10.length; i++) {
          client.set(`${i}`, todayTop10[i].name);
        }
        setTimeout(resolve, 86400000);
      });
    }
  })();

  getRedis = async () => {
    let cacheArr = [];

    const cacheLength = await client.dbSize();

    if (cacheLength > 0) {
      for (let i = 0; i < cacheLength; i++) {
        const tag = await client.get(`${i}`);
        cacheArr.push(tag);
      }
      return cacheArr;
    }

    this.tags();
  };

  findArticleByTag = async (tag) => {
    const searchArticles = await this.tagRepository.findArticleByTag(tag);
    const articles = searchArticles[0].Article_Tag_Mappings;
    const mappingArticle = articles.map((article) => {
      return {
        id : article.Article.id,
        title: article.Article.title,
        contents: article.Article.contents,
        count: article.Article.count,
        author: article.Article.User.email,
        createdAt: article.Article.createdAt,
      };
    });

    return {mappingArticle, searchTag : searchArticles[0].tag};
  };
}

module.exports = TagService;
