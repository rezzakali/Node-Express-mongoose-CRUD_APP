const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});
// creating a model using the Schema

const userModel = new mongoose.model("CRUD_API", userSchema);

module.exports = userModel;
