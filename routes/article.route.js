const express = require("express")
const router = express.Router()

const ArticleController = require("../controllers/article.controller")

const articleController = new ArticleController()
const authMiddleware = require("../middleware/auth")

//게시글 상세조회
router.get("/:id", articleController.findOneArticle)
//게시글 작성
router.post("/", authMiddleware, articleController.postArticle)
//게시글 수정
router.patch("/:id", authMiddleware, articleController.patchArticle)
//게시글 삭제
router.delete("/:id", authMiddleware, articleController.deleteArticle)

module.exports = router