const TagService = require("../services/tag.service");

class TagController {
  tagService = new TagService();

  top10 = async (req,res) => {
    const tags = await this.tagService.tags()

    res.json(tags)
  }
}

module.exports = TagController;
