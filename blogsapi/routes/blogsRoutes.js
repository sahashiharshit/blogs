const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');
// Create a new blog
router.post('/', blogsController.createBlog);

// Get all blogs
router.get('/', blogsController.getAllBlogs);
router.get('/:blogId',blogsController.getComments);
module.exports = router;