const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: String,
    username: String,
    content: String,
    userID: String,
    category: {
      type: String,
      enum: ["Tech", "Lifestyle", "Business", "Entertainment"],
    },
    date: { type: Date, default: Date.now() },
    like: { type: Number, default: 0 },
    comment: [{ name: String, content: String }],
  },
  { timestamp: true }
);

const blogModel = mongoose.model("blog", blogSchema);

module.exports = { blogModel };
