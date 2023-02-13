const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

const UserController = require("../controllers/users.controller")
const userController = new UserController()

router.post("/signup", userController.signup)
router.post("/login", userController.login)
router.get("/logout", userController.logout)
router.get("/mypage", auth, userController.userInfo)

module.exports = router