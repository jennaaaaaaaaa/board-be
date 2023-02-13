const express = require("express")
const router = express.Router()

const MainController = require("../controllers/main.controller")
const mainController = new MainController()

router.get("/", mainController.findAllArticles)

module.exports = router