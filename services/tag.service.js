const {Tag, Article_Tag_Mapping} = require("../models")
const {client} = require("../util/redis")
const TagRepository = require("../repositorys/tag.repository")

class TagService {
  tagRepository = new TagRepository(Tag, Article_Tag_Mapping)

  tags = async () => {
    const Allcount = await this.tagRepository.countTag()
    const top10 = Allcount.sort((a,b) => {
      return b.count - a.count
    }).slice(0, 10)
    
    const names = await Promise.all(top10.map(async(tag) => {
      const name = await this.tagRepository.findTag(tag.tag_id)
      return {name: name.tag}
    }))

    return names
  }

  useMemory = async () => {
    for (let i = 0; i < todayTop10.length; i++) {
      client.GET("articles_count" + [i])
    }
    await client.GET()
  }
}

module.exports = TagService