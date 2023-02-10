class UserRepository {
  constructor (UserModel) {
    this.userModel = UserModel
  }

  signup = async (name, email, password) => {
    return await this.userModel.create({name, email, password})
  }

  findUser = async (email, password) => {
    return await this.userModel.findAll({where: {email, password}})
  }
}

module.exports = UserRepository