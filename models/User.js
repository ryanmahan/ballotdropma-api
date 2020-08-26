const { Schema, model } = require("mongoose");

const User = new Schema({
  session: String,
  lastAccess: Date,
})

module.exports = model("users", User);