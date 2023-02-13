const express = require("express")
const router = express.Router()

const ArticleController = require("../controllers/article.controller")
const articleController = new ArticleController()

router.get("/", articleController.findAllArticles)

module.exports = router