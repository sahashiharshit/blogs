const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Create a new comment
router.post('/:blogId', commentController.createComment);

// Delete a comment
router.delete('/:id', commentController.deleteComment);

module.exports = router;