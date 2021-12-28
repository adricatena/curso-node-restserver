const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`El rol ${role} no existe en la BD`);
  }
};

/* 
  // validamos correo
  const existEmail = await User.findOne({ mail });
  if (existEmail) {
    return res.status(400).json({
      msj: "Ese correo ya esta registrado",
    });
  }
*/

const existMail = async (mail = "") => {
  const existEmail = await User.findOne({ mail });
  if (existEmail) {
    throw new Error(`El mail ${mail} ya existe en la BD`);
  }
};

const userExistById = async (id) => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error(`El id ${id} no existe en la BD`);
  }
};

module.exports = { isValidRole, existMail, userExistById };
