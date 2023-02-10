const UserService = require("../services/users.service")

class UserController {
  userService = new UserService()

  signup = async (req, res) => {
    const {name, email, password, confirm} = req.body

    const {status, message} = await this.userService.signup(name, email, password, confirm)
    console.log(status)

    res.status(status).json(message)
  }

  login = async (req,res) => {
    const {email, password} = req.body

    const {status, message, cookie} = await this.userService.login(email, password)

    res.cookie("accessToken", cookie)

    res.status(status).json(message)
  }

  logout = async (req,res) => {
    res.clearCookie()
    return res.status(200).json({ message: '정상적으로 로그아웃 되었습니다.' });
  }

  userInfo = async(req,res) => {
    if (!res.locals.user) {
      return res.status(401).json({message: "로그인 해주세요"})
    }
    const {id} = res.locals.user

    const {status, info} = await this.userService.getUserInfo(id)

    res.status(status).json(info)
  }
}

module.exports = UserController