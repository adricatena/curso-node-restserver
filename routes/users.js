const { Router } = require("express");
const { check } = require("express-validator");

const { validateData } = require("../middleware/validate-data");
const {validateJWT} = require("../middleware/validate-jwt");

const {
  isValidRole,
  existMail,
  userExistById,
} = require("../helpers/db-validators");

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
  [ validateJWT
    check("name", "El nombre es obligatorio").notEmpty(),
    check("password", "El password debe tener al menos 6 letras").isLength({
      min: 6,
    }),
    check("mail").custom(existMail),
    // check("mail", "El email no es valido").isEmail(),
    // check("role", "No es un role valido").isIn("ADMIN_ROLE", "USER_ROLE"),
    check("role").custom(isValidRole),
    validateData,
  ],
  postUsers
);

router.put(
  "/:id",
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(userExistById),
    check("role").custom(isValidRole),
    validateData,
  ],
  putUsers
);
router.patch("/", patchUsers);
router.delete(
  "/:id",
  [ validate
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(userExistById),
    validateData,
  ],
  deletetUsers
);

module.exports = router;
