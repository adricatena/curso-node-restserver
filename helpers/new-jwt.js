const jwt = require("jsonwebtoken");

const newJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETPRIVATEKEY,
      { expiresIn: "4h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el JWT correctamente");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { newJWT };
