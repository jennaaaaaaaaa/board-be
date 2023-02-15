class ArticleRepository {
  constructor(TagModel, Article_Tag_MappingModel) {
    this.tagModel = TagModel;
    this.article_tag_mappingModel = Article_Tag_MappingModel;
  }

  countTag = async () => {
    return await this.article_tag_mappingModel.count({group: ['tag_id']})
  }

  findTag = async (id) => {
    return await this.tagModel.findByPk(id)
  }
}

module.exports = ArticleRepository;
