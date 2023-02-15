const express = require('express');
const router = express.Router();

const articleRouter = require("./article.route")
const userRouter = require("./user.route")
const commentsRouter = require("./comments.routes")

router.use("/articles", articleRouter)
router.use("/users", userRouter)
router.use("/comments", commentsRouter)

module.exports = router