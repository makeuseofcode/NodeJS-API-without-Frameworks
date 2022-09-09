const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog must have a title"],
  },

  body: {
    type: String,
    required: [true, "Blog must have a title"],
  },
});

module.exports = mongoose.model("Blog", blogSchema);
