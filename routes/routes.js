const express = require('express');
const router = express.Router();

const articleRouter = require("./article.route")
const tagRouter = require("./tag.route")

router.use("/articles", articleRouter)
router.use("/tags", tagRouter)

module.exports = router
