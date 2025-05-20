const User = require("../models/UserSchema");
const Inventory = require("../models/InventorySchema");

const create = async (req, res) => {
  const { name, email, password, bg, sprite } = req.body;
  const user = new User({ name, email, password, sprite, bg });
  try {
    await user.save();

    return res.status(200).json({
      success: true,
      msg: "User added!",
      payload: user,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getByCredential = async (req, res) => {
  const { email, password } = req.body;

  try {
    const d = await User.findOne({
      email: email,
      password: password,
    });

    // console.log(d);

    if (!d) {
      return res
        .status(200)
        .json({ success: false, msg: "No users found!", payload: null });
    }

    return res.status(200).json({
      success: true,
      msg: "User found!",
      payload: d,
    });
  } catch (e) {
    return res.status(200).send(e);
  }
};

const getAll = async (req, res) => {
  try {
    const r = await User.find().lean();

    return res.status(200).json({
      msg: "Users retrieved!",
      payload: r,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getAllPopulated = async (req, res) => {
  try {
    const r = await User.find()
      .lean()
      .populate("items")
      .populate({
        path: "skills",
        populate: {
          path: "skill",
        },
      });

    return res.status(200).json({
      msg: "Users retrieved!",
      payload: r,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const get = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).lean();

    return res.status(200).json({
      success: true,
      msg: "User found!",
      payload: user,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const addItem = async (req, res) => {
  const { user, item } = req.body;

  try {
    const r = await User.findOneAndUpdate(
      { _id: user },
      {
        $push: {
          items: item,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      msg: "Added new item to user!",
      payload: r,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getItems = async (req, res) => {
  const { user } = req.params;

  try {
    const d = await User.findById(user).populate("items");

    return res.status(200).json({
      msg: "Items retrievedd!",
      payload: d.items,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getAssocSkill = async (req, res) => {
  const { user } = req.body;

  try {
    const d = await User.findById(user);

    return res.status(200).json({
      success: true,
      msg: "User retrieved",
      payload: d,
    });
  } catch (e) {
    return res.send(e);
  }
};

const progressXP = async (req, res) => {
  const { user, xp } = req.body;

  let d;
  try {
    d = await User.findOneAndUpdate(
      { _id: user },
      {
        $inc: {
          p_xp: xp,
        },
      },
      {
        new: true,
      }
    );

    // console.log(d);

    if (d.p_xp >= d.l_xp) {
      console.log(true);
      const f = await User.findOneAndUpdate(
        { _id: user },
        {
          $set: {
            p_xp: 0,
            l_xp: d.l_xp * 1.25,
            max_hp: d.max_hp + 10,
            max_sp: d.max_sp + 10,
            max_mp: d.max_mp + 10,
            atk: d.atk + 1,
            def: d.def + 1,
            mgc: d.mgc + 1,
          },
          $inc: {
            level: 1,
          },
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        msg: "User gained XP!",
        payload: f,
      });
    }

    return res.status(200).json({
      success: true,
      msg: "User gained XP!",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const del = async (req, res) => {
  const { id } = req.params;

  try {
    const i = await Inventory.deleteMany({ user: id });
    const d = await User.findOneAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      msg: "Deleted User record!",
      payload: [i, d],
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const update = async (req, res) => {
  const { id, name, email, password } = req.body;

  try {
    const d = await User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          name,
          password,
          email,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      msg: "Updated User record",
      paylaod: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports = {
  create,
  getAll,
  getAllPopulated,
  get,
  addItem,
  getAssocSkill,
  getItems,
  getByCredential,
  progressXP,
  del,
  update,
};
