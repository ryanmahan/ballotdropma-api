const { Schema, model } = require("mongoose");

const Location = new Schema({
  city: String,
  address: String,
  email: String,
  fax: String,
})

module.exports = model("locations", Location);