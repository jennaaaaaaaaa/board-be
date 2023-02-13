const { User, Article } = require("../models");
const UserRepository = require("../repositorys/users.repository");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {jwtConfig} = require("../util/config")

class UserService {
  userRepository = new UserRepository(User, Article);

  signup = async (name, email, password) => {
    const alreadyUser = await this.userRepository.findUser(email);

    if (alreadyUser[0]) {
      return { status: 409, message: "이미 존재하는 이메일 입니다." };
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await this.userRepository.signup(name, email, hashedPassword);
    return { status: 201, message: "회원가입 성공!" };
  };

  login = async (email, password) => {
    const user = await this.userRepository.findUser(email)

    const isPasswordCorrect = await bcrypt.compare(password, user[0].password)

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({message: "이메일 또는 비밀번호가 틀렸습니다."})
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
