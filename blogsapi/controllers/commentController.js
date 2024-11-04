const Comments = require("../models/Comments");

exports.createComment = async (req, res) => {
    const { commentContent } = req.body;
    const blogId = req.params.blogId;
    try {
      const newComment = await Comments.create({ commentContent, blogId });
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create comment' });
    }
  };
  
  // Delete a comment
  exports.deleteComment = async (req, res) => {
    const commentId = req.params.id;
    try {
      const result = await Comments.destroy({ where: { id: commentId } });
      if (result) {
        res.status(204).send(); // No content
      } else {
        res.status(404).json({ error: 'Comment not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete comment' });
    }
  };