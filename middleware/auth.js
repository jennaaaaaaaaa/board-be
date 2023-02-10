const {User} = require("../models")
const jwt = require("jsonwebtoken")
const {jwtConfig} = require("../util/config")

const authMiddleware = async (req,res,next) => {
  try {
    const {accessToken} = req.cookies
  
    if (!accessToken) {
      return next()
    }
  
    const {id} = jwt.verify(accessToken, jwtConfig.secretKey)
  
    const user = await User.findOne({where:id})
  
    if (!user) {
      throw new Error("회원이 존재하지 않습니다.")
    }
  
    res.locals.user = user
    next()
  } catch (err) {
    res.clearCookie()
    next(err)
  }
}

module.exports = authMiddleware