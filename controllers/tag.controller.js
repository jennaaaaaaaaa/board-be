const TagService = require("../services/tag.service");

class TagController {
  tagService = new TagService();

  top10 = async (req,res) => {
    const tags = await this.tagService.getRedis()

    res.json(tags)
  }
}

module.exports = TagController;
