const { Schema, model } = require("mongoose");

const { ObjectId } = Schema;

const Comment = new Schema({
  comment: String,
  created: { type : Date, default: Date.now },
  reports: [ { type: String } ],
  location: { type: ObjectId, ref: "location" },
  session: { type: String }
})

module.exports = model("comment", Comment);