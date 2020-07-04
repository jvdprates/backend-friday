const connection = require("../database/connection");

module.exports = {
    async createComment(comment) {
        console.log("Creating comment...");
        const result = await connection("comments")
            .insert(comment);
        console.log("Comment Created!");
        return result;
    },

    async getAllComments() {
        console.log("Getting all comments...");
        const result = await connection("comments")
            .select("*")
        return result;
    },

    async updateComment(comment_id, comment) {
        console.log("Updating comment: " + comment.name);
        const result = await connection("comments")
            .where("id", "=", comment_id)
            .update(comment);
        console.log("Comment Updated!");
        return result;
    },

    async deleteComment(comment_id) {
        console.log("Deleting comment...");
        const result = await connection("comments")
            .where("id", "=", comment_id)
            .delete();
        console.log("Comment Deleted!");
        return result;
    },

}