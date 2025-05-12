const Post = require("../models/PostSchema");

const create = async (req, res) => {
  const { owner, contents } = req.body;
  const post = new Post({ owner, contents });
  try {
    await post.save();

    return res.status(200).json({
      msg: "Post added!",
      payload: post,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const get = async (req, res) => {
  const { _id } = req.params;

  try {
    const post = await Post.findById(_id).populate("owner");

    return res.status(200).json({
      msg: "Post retrieved!",
      payload: post,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getAll = async (req, res) => {
  try {
    const posts = await Post.find()
      .lean()
      .populate({
        path: "owner",
        // select: "name",
        populate: { path: "items" },
      });

    return res.status(200).json({
      msg: "Retrieve all posts",
      payload: posts,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports = { create, get, getAll };
