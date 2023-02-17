const express = require('express');
const router = express.Router();

const articleRouter = require("./article.route")
const userRouter = require("./user.route")
const commentsRouter = require("./comments.routes")
const TagRouter = require("./tag.route")

router.use("/articles", articleRouter)
router.use("/users", userRouter)
router.use("/comments", commentsRouter)
router.use("/tags", TagRouter)

module.exports = router
