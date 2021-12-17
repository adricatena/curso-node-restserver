const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = require("../models/user");

const getUsers = (req = request, res = response) => {
  const query = req.query;
  const { id, nombre, api_key = "123456" } = req.query;
  res.json({
    msj: "get API - controller",
    query,
    id,
    nombre,
    api_key,
  });
};

const postUsers = async (req = request, res = response) => {
  const { name, mail, password, role } = req.body;
  // const { name, age } = req.body;
  const user = new User({ name, mail, password, role });
  // validamos correo
  const existEmail = await User.findOne({ mail });
  if (existEmail) {
    return res.status(400).json({
      msj: "Ese correo ya esta registrado",
    });
  }
  // hash
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  await user.save();
  res.json({
    user,
  });
};

const putUsers = (req = request, res = response) => {
  const param = req.params.id;
  const { id } = req.params;
  res.json({
    msj: "put API - controller",
    param,
    id,
  });
};

const patchUsers = (req = request, res = response) => {
  res.json({
    msj: "patch API - controller",
  });
};

const deletetUsers = (req = request, res = response) => {
  res.json({
    msj: "delete API - controller",
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deletetUsers,
};
