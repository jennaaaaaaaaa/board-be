const { Article, Tag, Article_Tag_Mapping, User, Comments } = require("../models");
const CommentsRepository = require("../repositorys/comments.repository")

class ArticleService {
    commentsRepository = new CommentsRepository(Article, Tag, Article_Tag_Mapping, User, Comments)

    postComments = async (article_id, user_id, contents) => {
        return await this.commentsRepository.createComments(
            article_id, user_id, contents
        )
    }

    getOneByArticle = async (article_id) => {

        const comment = await this.commentsRepository.readCommentsByArticle(article_id)

        comment.sort((a, b) => {
            return b.createdAt - a.createdAt
        })

        // return comment

        return comment.map(comment => {
            return {
                contents: comment.contents,
                article_id: comment.article_id,
                user_id: comment.user_id,
                createdAt: comment.createdAt
            }
        })

        // return this.commentsRepository.map
    }

    deleteOneComment = async (id, user_id) => { //값 받아오는것
        const getUserId = await this.commentsRepository.getCommentUserId(id)

        if (getUserId.user_id != user_id) {
            return { message: "본인만 삭제 가능" }
        }

        await this.commentsRepository.deleteComments(id) //값 보내주는 것
        return { message: "삭제 완료" }
    }

    patchOneComment = async (id, user_id, contents) => {
        const getUserId = await this.commentsRepository.getCommentUserId(id)

        if (getUserId.user_id != user_id) {
            return { message: "본인만 삭제 가능" }
        }

        await this.commentsRepository.patchComments(id, contents)

        return { message: "수정 완료" }
    }
}

module.exports = ArticleService