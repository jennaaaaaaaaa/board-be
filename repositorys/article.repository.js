class ArticleRepository {
  constructor(ArticleModel, TagModel, Article_Tag_MappingModel, UserModel) {
    this.articleModel = ArticleModel;
    this.tagModel = TagModel;
    this.userModel = UserModel;
    this.article_tag_mappingModel = Article_Tag_MappingModel;
  }

  createArticle = async (title, contents, user_id) => {
    return await this.articleModel.create({ title, contents, user_id })
  }

  findOrCreate = async (tag) => {
    const [tags, created] = await this.tagModel.findOrCreate({ where: { tag } })
    return tags
  }

  updateArticle = async (title, contents, tags, email) => {
    return await this.articleModel.update({ title, contents, tags, email },
      { where: { id } },
      {
        include: [{
          model: this.article_tag_mappingModel, attributes: ['tag_id'],
          include: [{
            model: this.tagModel, attributes: ['tag']
          }]
        }, { model: this.userModel, attributes: ['email'] }]
      })
  }

  //매핑 테이블에 넣어야한다는게 tagid, articleid
  tagsInstance = async (mappings) => {
    await this.article_tag_mappingModel.bulkCreate(mappings)
  }

  findAllArticles = async (page) => {
    const { count, rows } = await this.articleModel.findAndCountAll({
      attributes: ["title", "contents", "count"],
      offset: (page - 1) * 8,
      limit: 8,
      order: [["id", "DESC"]],
    });

    return { count, rows };
  };

  findOneArticle = async (article_id) => {
    return await this.articleModel.findByPk(article_id, {
      include: [{
        model: this.article_tag_mappingModel, attributes: ['tag_id'],
        include: [{
          model: this.tagModel, attributes: ['tag']
        }]
      }, { model: this.userModel, attributes: ['email'] }]
    })
  }

  findTagByArticle = async (article_id) => {
    return await this.article_tag_mappingModel.findByPk(article_id, {
      include: [{ model: this.tagModel, attributes: ['tag'] }]
    })
  }

  //맵핑테이블 article_id 삭제
  mappingsDel = async (article_id) => {
    return await this.article_tag_mappingModel.findByPk({ where: article_id })
  }

}

module.exports = ArticleRepository;
