const { Router } = require("express");
const log4js = require("log4js")
const GenericCallback = require("../utils/GenericCallback")

const logger = log4js.getLogger();

const GenericController = (Model, router) => {

  router.get("/", (req, res) => {
    Model.find(req.query.query, req.query.fields, GenericCallback(res))
  })

  router.get("/:id", (req, res) => {
    Model.findById(req.params.id, GenericCallback(res));
  })
 
  router.put("/:id", (req, res) => {
    Model.findOneAndReplace(req.params.id, req.body, GenericCallback(res));
  })

  router.patch("/:id", (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, GenericCallback(res));
  })

  router.post("/", (req, res) => {
    const instance = new Model(req.body);
    instance.save(GenericCallback(res));
  })

  // router.delete(route + "/:id", (req, res) => {
  //   Model.findByIdAndRemove(req.params.id, req.body, (doc) => {
  //     if (doc) res.json(doc).status(200);
  //     else res.status(404);
  //   }).catch(err => {
  //     logger.error(err);
  //     res.json(err).status(500);
  //   })
  // })

  return router;
}

module.exports = GenericController;