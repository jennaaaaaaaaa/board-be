class ArticleRepository {
    constructor(ArticleModel, TagModel, Article_Tag_MappingModel, UserModel, CommentsModel) {
        this.articleModel = ArticleModel;
        this.tagModel = TagModel;
        this.userModel = UserModel;
        this.article_tag_mappingModel = Article_Tag_MappingModel;
        this.commentsModel = CommentsModel;
    }

    createComments = async (article_id, user_id, contents) => {
        return await this.commentsModel.create({ article_id, user_id, contents })
    }

    deleteComments = async (id) => {
        return await this.commentsModel.destroy({ where: { id } })
    }

    readCommentsByArticle = async (article_id) => {
        return await this.commentsModel.findAll({ where: { article_id } })
    }

    patchComments = async (id, contents) => {
        return await this.commentsModel.update({ contents }, { where: { id } })
    }

    getCommentUserId = async (id) => {
        return await this.commentsModel.findByPk(id)
    }




}

module.exports = ArticleRepository;
