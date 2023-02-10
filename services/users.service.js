const { User, Article } = require("../models");
const UserRepository = require("../repositorys/users.repository");
const jwt = require("jsonwebtoken")
const {jwtConfig} = require("../util/config")

class UserService {
  userRepository = new UserRepository(User, Article);

  signup = async (name, email, password, confirm) => {
    if (password !== confirm) {
      return { status: 403, message: "비밀번호가 일치하지 않습니다!" };
    }

    const alreadyUser = await this.userRepository.findUser(email);

    if (alreadyUser[0]) {
      return { status: 409, message: "이미 존재하는 이메일 입니다." };
    }

    await this.userRepository.signup(name, email, password);
    return { status: 201, message: "회원가입 성공!" };
  };

  login = async (email, password) => {
    const user = await this.userRepository.checkUserByEmailPassword(email, password)

    if (!user) {
      return {status: 401, message: "로그인 실패"}
    }
    const cookie = jwt.sign({id : user.id}, jwtConfig.secretKey, jwtConfig.options)

    return {status: 200, message: "로그인", cookie}
  }

  getUserInfo = async (id) => {
    const info = await this.userRepository.userInfoAndArticles(id)

    return {status: 200, info}
  }
}

module.exports = UserService;
