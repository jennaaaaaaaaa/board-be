const express = require('express');
const router = express.Router();

const articleRouter = require("./article.route")

router.use("/articles", articleRouter)

module.exports = router
