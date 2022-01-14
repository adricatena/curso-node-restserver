const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { newJWT } = require("../helpers/new-jwt");

const login = async (req = request, res = response) => {
  const { mail, password } = req.body;

  try {
    // Verificar si el mail existe
    const user = await User.findOne({ mail });
    if (!user) {
      return res.status(400).json({
        msg: "Usuario/Password no encontrados - mail inexistente",
      });
    }

    // Si el usuario esta activo
    if (!user.state) {
      return res.status(400).json({
        msg: "Usuario/Password no encontrados - usuario deshabilitado",
      });
    }

    // Verificar la contrasena
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario/Password no encontrados - Contrasena invalida",
      });
    }

    // Generar el JWT
    const token = await newJWT(user.id);
    return res.json({ msj: "Login ok", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = { login };
