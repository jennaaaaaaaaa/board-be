const express = require('express');
const router = express.Router();

const mainRouter = require("./main.route")

router.use("/articles", mainRouter)

module.exports = router
