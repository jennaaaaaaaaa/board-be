class ArticleRepository {
  constructor(TagModel, Article_Tag_MappingModel, ArticleModel, UserModel) {
    this.tagModel = TagModel;
    this.article_tag_mappingModel = Article_Tag_MappingModel;
    this.articleModel = ArticleModel;
    this.userModel = UserModel;
  }

  countTag = async () => {
    return await this.article_tag_mappingModel.count({ group: ["tag_id"] });
  };

  findTag = async (id) => {
    return await this.tagModel.findByPk(id);
  };

  findArticleByTag = async (tag) => {
    const a = await this.tagModel.findOne({
      where: { tag },
      include: [
        {
          model: this.article_tag_mappingModel,
          include: [
            {
              model: this.articleModel,
              attributes: ["id", "title", "contents", "count", "createdAt"],
              include: [{ model: this.userModel, attributes: ["email"] }],
            },
          ],
        },
      ],
    });
    return a;
  };
}

module.exports = ArticleRepository;
