const { Router } = require("express");
const {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deletetUsers,
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);
router.post("/", postUsers);
router.put("/:id", putUsers);
router.patch("/", patchUsers);
router.delete("/", deletetUsers);

module.exports = router;
