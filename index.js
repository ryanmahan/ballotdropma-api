const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const log4js = require("log4js");
require('dotenv').config()
const GenericController = require("./controllers/GenericController");
const bodyParser = require("body-parser");
const Location = require("./models/Location");
const CommentController = require("./controllers/CommentController");

const { Router } = express;
const app = express();
const logger = log4js.getLogger();
app.use(bodyParser.json());


const uri = process.env.mongo_uri || "mongodb://localhost:27017/ballotdrop"

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


app.use(cors())
app.set("trust proxy", 1);


app.use((req, res, next) => {
  logger.info(req.method + " " + req.url);
  next();
})

app.get("/ping", (req, res) => res.send("pong"));
app.get("/session", (req, res) => {
  console.log(req.query)
  res.json(req.query.session)
})
app.use("/comments", CommentController(Router()))
app.use("/locations", GenericController(Location, Router()));


app.listen(8080, () => console.log("App listening on 8080"));