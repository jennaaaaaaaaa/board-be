const express = require("express")
const router = express.Router()

const CommentsController = require("../controllers/comments.controller")

const commentsController = new CommentsController()
const authMiddleware = require("../middleware/auth")

//아티클별 댓글조회 
router.get("/:article_id", authMiddleware, commentsController.getOneByArticle)
//댓글 작성
router.post("/:article_id", authMiddleware, commentsController.postComments)
//댓글 수정
router.patch("/:id", authMiddleware, commentsController.patchOneComment)
//댓글 삭제
router.delete("/:id", authMiddleware, commentsController.deleteOneComment)

module.exports = router