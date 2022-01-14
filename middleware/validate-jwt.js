const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req = request, res = response, next) => {
  const token = req.headers("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No se encontro token",
    });
  }

  try {
    // const payload = jwt.verify(token, process.env.SECRETPRIVATEKEY);
    const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = { validateJWT };
