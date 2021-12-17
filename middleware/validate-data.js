const { request, response, next } = require("express");
const { validationResult } = require("express-validator");
const validateData = (req = request, res = response, nxt = next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  nxt();
};
module.exports = { validateData };
