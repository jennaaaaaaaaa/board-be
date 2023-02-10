const {User} = require("../models")
const UserRepository = require("../repositorys/users.repository")

class UserService {
  userRepository = new UserRepository(User)

  signup = async (name, email, password) => {
    const alreadyUser = this.userRepository.findUser(email)

    if (alreadyUser) {
      return
    }
    
    return this.userRepository.signup(name, email, password)
  }
}

module.exports = UserService