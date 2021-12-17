const { Router } = require("express");
const { check } = require("express-validator");

const { validateData } = require("../middleware/validate-data");

const {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deletetUsers,
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("password", "El password debe tener al menos 6 letras").isLength({
      min: 6,
    }),
    check("mail", "El email no es valido").isEmail(),
    check("role", "No es un role valido").isIn("ADMIN_ROLE", "USER_ROLE"),
    validateData,
  ],
  postUsers
);
router.put("/:id", putUsers);
router.patch("/", patchUsers);
router.delete("/", deletetUsers);

module.exports = router;
