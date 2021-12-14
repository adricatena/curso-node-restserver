const { request, response } = require("express");

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

const postUsers = (req = request, res = response) => {
  const body = req.body;
  const { name, age } = req.body;
  res.json({
    msj: "post API - controller",
    body,
    name,
    age,
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
