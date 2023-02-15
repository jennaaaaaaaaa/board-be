const express = require("express")
const router = express.Router()

const TagController = require("../controllers/tag.controller")
const tagController = new TagController()

router.get("/", tagController.top10)
router.get("/articles", tagController.findArticleByTag)

module.exports = router