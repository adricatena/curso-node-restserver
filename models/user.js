const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  mail: {
    type: String,
    required: [true, "El email es obligatorio"],
  },
  password: {
    type: String,
    required: [true, "La contrasena es obligatoria"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("User", userSchema);
