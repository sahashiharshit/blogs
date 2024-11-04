const Blogs = require("../models/Blogs");
const Comments = require("../models/Comments");

exports.createBlog = async (req, res) => {
  const { blogTitle, blogAuthor, blogContent } = req.body;

  try {
    const newBlog = await Blogs.create({ blogTitle, blogAuthor, blogContent });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog" });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.findAll();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};
exports.getComments = async (req,res)=>{
    const {blogId} = req.params;
 
    try{
        const comments = await Comments.findAll({where:{blogId:blogId}});
        res.status(200).json(comments);
    }catch(error){
        res.status(500).json({ error: "Failed to fetch comments" });
    }
}