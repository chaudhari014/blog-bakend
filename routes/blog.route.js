const express = require("express");
const {
  getBlogs,
  createBlogs,
  updateBlogs,
  deleteBlogs,
  updateBlogsLike,
} = require("../controller/blog.controller");

const blogRouteHandler = express.Router();

blogRouteHandler.get("/blogs", getBlogs);
blogRouteHandler.post("/blogs", createBlogs);
blogRouteHandler.patch("/blogs/:id", updateBlogs);
blogRouteHandler.delete("/blogs/:id", deleteBlogs);
blogRouteHandler.patch("/blogs/:id/like", updateBlogsLike);
// blogRouteHandler.patch("/blogs/:id/comment");

module.exports = { blogRouteHandler };
