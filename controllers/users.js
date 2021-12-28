const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
// const { validationResult } = require("express-validator");

const User = require("../models/user");

const getUsers = async (req = request, res = response) => {
  /* const query = req.query;
  const { id, nombre, api_key = "123456" } = req.query; */

  const { limit = 5, since = 0 } = req.query;
  const query = { state: true };

  /* const total = await User.countDocuments({ state: true });
  const users = await User.find({ state: true })
    .skip(Number(since))
    .limit(Number(limit)); */

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(since)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

const postUsers = async (req = request, res = response) => {
  const { name, mail, password, role } = req.body;
  // const { name, age } = req.body;
  const user = new User({ name, mail, password, role });

  // hash
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  await user.save();
  res.json({
    user,
  });
};

const putUsers = async (req = request, res = response) => {
  // const param = req.params.id;
  const { id } = req.params;
  const { _id, password, google, correo, ...info } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    info.password = bcryptjs.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, info);

  res.json(user);
};

const patchUsers = (req = request, res = response) => {
  res.json({
    msj: "patch API - controller",
  });
};

const deletetUsers = async (req = request, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json(user);
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deletetUsers,
};
