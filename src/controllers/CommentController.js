const CommentModel = require("../models/CommentModel");

module.exports = {
  async create(request, response) {
    try {
      const comment = request.body;
      const result = await CommentModel.createComment(comment);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Comment creation failed: " + err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to create comment",
        });
    }
  },

  async index(request, response) {
    try {
      const { bar_id } = request.params;
      const result = await CommentModel.index(bar_id);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Comment reading failed: " + err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to get categories",
        });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const comment = request.body;
      let result = await CommentModel.updateComment(id, comment);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Categorization process failed: " + err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to categorise bar",
        });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const result = await CommentModel.deleteComment(id);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Comment deletion failed: " + err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to delete comment",
        });
    }
  },
};
