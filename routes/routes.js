const express = require('express');
const router = express.Router();

const articleRouter = require("./article.route")
const userRouter = require("./user.route")

router.use("/articles", articleRouter)
router.use("/users", userRouter)

module.exports = router
