const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const log4js = require("log4js");
const GenericController = require("./controllers/GenericController");
const Comment = require("./models/Comment");
const Location = require("./models/Location");

const app = express();
const logger = log4js.getLogger();

mongoose.connect("mongodb://localhost:27017/ballotdrop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(cors());
app.use((req, res, next) => {
  logger.info(req.method + " " + req.url);
  next();
})

app.get("/ping", (req, res) => res.send("pong"));

app.use("/comments", GenericController(Comment))
app.use("/locations", GenericController(Location));


app.listen(8080);