const express = require('express');
const router = express.Router();

const articleRouter = require("./article.route")
const userRouter = require("./user.route")
const TagRouter = require("./tag.route")

router.use("/articles", articleRouter)
router.use("/users", userRouter)
router.use("/tags", TagRouter)

module.exports = router
