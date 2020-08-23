const { Router } = require("express");
const log4js = require("log4js");
const GenericController = require("./GenericController");
const Comment = require("../models/Comment");
const GenericCallback = require("../utils/GenericCallback");

const logger = log4js.getLogger();

const CommentController = (router) => {

  GenericController(Comment, router);

  router.post("/", (req, res) => {
    const comment = new Comment({
      sessionId: req.query.session,
      reports: [],
      ...req.body,
    })
    comment.save()
      .then(doc => res.status(200).json(doc))
      .catch(err => res.status(500).json(err));
  });

  router.patch("/report/:id", (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, {
      $addToSet: { reports: req.query.session }
    }, GenericCallback(res))
  })

  return router;
}

module.exports = CommentController;