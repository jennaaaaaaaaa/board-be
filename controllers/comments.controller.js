const CommentsService = require("../services/comments.service");

class CommentsController {
    commentsService = new CommentsService();


    //댓글 작성
    postComments = async (req, res) => {
        if (!res.locals.user) {
            return res.status(500).json({ message: "로그인 하세요" })
        }

        const { article_id } = req.params //comment에 article_id가 null값으로 들어옴 이유
        const { contents } = req.body
        const { id: user_id } = res.locals.user

        const comments = await this.commentsService.postComments(
            article_id,
            user_id,
            contents
        )
        res.json({ data: comments })

    }

    //댓글조회
    getOneByArticle = async (req, res) => {
        const { article_id } = req.params
        const articleComments = await this.commentsService.getOneByArticle(article_id)
        res.json({ articleComments })
    }

    //삭제
    deleteOneComment = async (req, res) => {
        if (!res.locals.user) {
            return res.status(500).json({ message: "로그인 하세요" })
        }

        const { id } = req.params
        const { message } = await this.commentsService.deleteOneComment(id)

        res.json({ message: message })
    }

    //수정
    patchOneComment = async (req, res) => {
        if (!res.locals.user) {
            return res.status(500).json({ message: "로그인 하세요" })
        }
        const { id } = req.params

        const { id: user_id } = res.locals.user

        const { contents } = req.body

        const update = await this.commentsService.patchOneComment(id, user_id, contents)
        res.json({ data: update })

    }
}

module.exports = CommentsController;
