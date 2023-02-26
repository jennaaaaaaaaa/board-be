class UserRepository {
  constructor(UserModel, ArticleModel) {
    this.userModel = UserModel;
    this.articleModel = ArticleModel;
  }

  signup = async (name, email, password) => {
    return await this.userModel.create({ name, email, password });
  };

  findUser = async (email) => {
    return await this.userModel.findAll({ where: { email } });
  };

  userInfoAndArticles = async (id) => {
    const info = await this.userModel.findByPk(id, {
      attributes: ["name", "email"],
      include: [
        {
          model: this.articleModel,
          attributes: ["title", "contents", "createdAt"],
          order: [["createdAt", "desc"]],
          limit: 5,
        },
      ],
    });

    return info;
  };
}

module.exports = UserRepository;
