const Joi = require("joi")

const signupValidation = Joi.object({
  name: Joi.string().not("").min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(12).not("").required(),
  confirm: Joi.equal(Joi.ref("password")).required().messages({
    "any.only": "비밀번호가 일치하지 않습니다."
  })
})

module.exports = {
  signupValidation
}