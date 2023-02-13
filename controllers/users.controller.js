const UserService = require("../services/users.service")
const {signupValidation} = require("../middleware/validation")

class UserController {
  userService = new UserService()

  signup = async (req, res) => {
    try {
      const {name, email, password, confirm} = await signupValidation.validateAsync(req.body)
  
      const {status, message} = await this.userService.signup(name, email, password)
  
      res.status(status).json(message)
    } catch (err) {
      if (err.isJoi) {
        return res.status(422).json({message: err.details[0].message})
      }
    }
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