const TagService = require("../services/tag.service");

class TagController {
  tagService = new TagService();

  top10 = async (req,res) => {
    const tags = await this.tagService.getRedis()

    res.json(tags)
  }

  findArticleByTag = async (req,res) => {
    const {tag} = req.query

    const article = await this.tagService.findArticleByTag(tag)

    res.json(article)
  }
}

module.exports = TagController;
