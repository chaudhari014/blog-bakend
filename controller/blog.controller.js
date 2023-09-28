const { blogModel } = require("../model/blog.model");

const getBlogs = async (req, res) => {
  try {
    const { title, category, order, sort } = req.query;
    let filter = {};
    if (title) {
      filter.title = title;
    }
    if (category) {
      filter.category = category;
    }
    let sortOption = {};
    if (order) {
      sortOption[sort] = order === "asc" ? 1 : -1;
    }
    console.log(sortOption);
    const getBlog = await blogModel.find(filter).sort(sortOption);
    res.status(200).json({ data: getBlog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const createBlogs = async (req, res) => {
  const { title, content, category } = req.body;
  try {
    console.log(req.body);
    const blogData = new blogModel(req.body);
    await blogData.save();
    res.status(200).json({ data: blogData, msg: "successfully create" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body, req.params);
    const serchBlog = await blogModel.find({
      userID: req.body.userID,
      _id: id,
    });
    console.log(serchBlog);
    if (serchBlog.length > 0) {
      const blog = await blogModel.findByIdAndDelete({ _id: id });
      res.status(200).json({ msg: "successfully deleted" });
    } else {
      res.status(400).json({ msg: "Not Authorize" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const updateBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    const serchBlog = await blogModel.find({
      userID: req.body.userID,
      _id: req.params,
    });
    if (serchBlog.length > 0) {
      const blog = await blogModel.findBYIdAndUpdate({ _id: id }, req.body);
      res.status(200).json({ msg: "successfully updated" });
    } else {
      res.status(400).json({ msg: "Not Authorize" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const updateBlogsLike = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(req.body, req.params);
    const serchBlog = await blogModel.find({
      _id: id,
    });
    // console.log(serchBlog);
    if (serchBlog.length > 0) {
      serchBlog[0].like++;
      // console.log(serchBlog[0]);
      const blog = await blogModel.findByIdAndUpdate({ _id: id }, serchBlog[0]);
      res.status(200).json({ msg: "successfully ", data: blog });
    } else {
      res.status(400).json({ msg: "Not Authorize" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const updateBlogsComment = async (req, res) => {};

module.exports = {
  getBlogs,
  createBlogs,
  deleteBlogs,
  updateBlogs,
  updateBlogsLike,
};
