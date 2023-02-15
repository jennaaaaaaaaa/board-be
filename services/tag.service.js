const { Tag, Article_Tag_Mapping } = require("../models");
const TagRepository = require("../repositorys/tag.repository");

class TagService {
  tagRepository = new TagRepository(Tag, Article_Tag_Mapping);

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

  getRedis = async () => {    
    const client = require("../util/redis")
    
    let memoryArr = [];

    const memoryLength = await client.dbSize();

    if (memoryLength > 0) {
      for (let i = 0; i < memoryLength; i++) {
        const tag = await client.get(`${i}`);
        memoryArr.push(tag);
      }
      return memoryArr
    }

    this.tags()
  }
}

module.exports = TagService;
