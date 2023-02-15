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

  updateArticle = async (article_id) => {
    return await this.articleModel.update({ title, contents, tags, email }, {
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

  findAllArticles = async () => {
    return await this.articleModel.findAll({
      attributes: ["title", "contents", "count"],
    });
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

  // updateArticle = async(title, contents, user_id) //작성자user_id

}

module.exports = ArticleRepository;
