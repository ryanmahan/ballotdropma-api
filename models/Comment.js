const { Schema, model } = require("mongoose");

const { ObjectId } = Schema;

const Comment = new Schema({
  comment: String,
  created: { type : Date, default: Date.now },
  reports: Number,
  location: { type: ObjectId, ref: "location" },
})

module.exports = model("comment", Comment);