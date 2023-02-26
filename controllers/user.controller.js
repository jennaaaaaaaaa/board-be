const UserService = require("../services/user.service");
const CustomError = require("../util/customError");
const { signupValidation } = require("../util/validation");

class UserController {
  userService = new UserService();

  signup = async (req, res, next) => {
    try {
      const { name, email, password, confirm } =
        await signupValidation.validateAsync(req.body);

      const message = await this.userService.signup(name, email, password);

      res.json(message);
    } catch (err) {
      if (err.isJoi) {
        return res.status(422).json({ message: err.details[0].message });
      }
      next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new CustomError(400, "이메일, 비밀번호를 입력해주세요!")
      }

      const cookie = await this.userService.login(email, password);

      res.cookie("accessToken", cookie);

      res.json(true);
    } catch (err) {
      next(err);
    }
  };

  logout = async (req, res) => {
    res.clearCookie();
    return res.status(200).json({ message: "정상적으로 로그아웃 되었습니다." });
  };

  userInfo = async (req, res) => {
    if (!res.locals.user) {
      return res.status(401).json({ message: "로그인 해주세요" });
    }
    const { id } = res.locals.user;

    const { status, info } = await this.userService.getUserInfo(id);

    res.status(status).json(info);
  };
}

module.exports = UserController;
