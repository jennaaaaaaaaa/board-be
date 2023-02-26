const { User, Article } = require("../models");
const UserRepository = require("../repositorys/user.repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { jwtConfig } = require("../util/config");
const CustomError = require("../util/customError")

class UserService {
  userRepository = new UserRepository(User, Article);

  signup = async (name, email, password) => {
    const alreadyUser = await this.userRepository.findUser(email);

    if (alreadyUser[0]) {
      throw new CustomError(409, "이미 존재하는 이메일입니다.")
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await this.userRepository.signup(name, email, hashedPassword);
    return true
  };

  login = async (email, password) => {
    const user = await this.userRepository.findUser(email);

    if (!user[0]) {
      throw new CustomError(400, "존재하지 않는 이메일입니다.")
    }
    
    const isPasswordCorrect = await bcrypt.compare(password, user[0].password);
    
    if (!isPasswordCorrect) {
      throw new CustomError(400, "잘못된 비밀번호입니다.")
    }

    const cookie = jwt.sign(
      { id: user[0].id },
      jwtConfig.secretKey,
      jwtConfig.options
    );

    return cookie
  };

  getUserInfo = async (id) => {
    return await this.userRepository.userInfoAndArticles(id);
  };
}

module.exports = UserService;
