const { User, Article } = require("../models");
const UserRepository = require("../repositorys/user.repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { jwtConfig } = require("../util/config");

class UserService {
  userRepository = new UserRepository(User, Article);

  signup = async (name, email, password) => {
    const alreadyUser = await this.userRepository.findUser(email);

    if (alreadyUser[0]) {
      return { status: 409 };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await this.userRepository.signup(name, email, hashedPassword);
    return { status: 201, message: "회원가입 성공!" };
  };

  login = async (email, password) => {
    const user = await this.userRepository.findUser(email);

    const isPasswordCorrect = await bcrypt.compare(password, user[0].password);

    if (!user || !isPasswordCorrect) {
      return { status: 400 };
    }

    const cookie = jwt.sign(
      { id: user[0].id },
      jwtConfig.secretKey,
      jwtConfig.options
    );

    return { status: 200, message: "로그인", cookie };
  };

  getUserInfo = async (id) => {
    const info = await this.userRepository.userInfoAndArticles(id);

    return { status: 200, info };
  };
}

module.exports = UserService;
