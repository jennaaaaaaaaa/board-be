class ArticleRepository {
  constructor(TagModel, Article_Tag_MappingModel, ArticleModel) {
    this.tagModel = TagModel;
    this.article_tag_mappingModel = Article_Tag_MappingModel;
    this.articleModel = ArticleModel;
  }

  countTag = async () => {
    return await this.article_tag_mappingModel.count({group: ['tag_id']})
  }

  findTag = async (id) => {
    return await this.tagModel.findByPk(id)
  }

  findArticleByTag = async (tag) => {
    const a = await this.tagModel.findAll({
      where: {tag},
      include: [{model: this.article_tag_mappingModel, include: [{model: this.articleModel}]}]
    })
    return a
  }
}

module.exports = ArticleRepository;