const { Router } = require("express");
const { check } = require("express-validator");

const { login } = require("../controllers/auth");
const { validateData } = require("../middleware/validate-data");

const router = Router();

router.post(
  "/login",
  [
    check("mail", "El correo es obligatorio").isEmail(),
    check("password", "La contrasena es obligatoria").notEmpty(),
    validateData,
  ],
  login
);

module.exports = router;
