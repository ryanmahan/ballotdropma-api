const { Router } = require("express");
const log4js = require("log4js")

const logger = log4js.getLogger();

const GenericController = (Model) => {

  const router = Router();

  const callback = (res) => (err, doc) => {
    if (err) {
      logger.error(err);
      res.status(500).json(err);
    }
    else if (doc) res.json(doc).status(2000);
    else res.status(404);
  };

  router.get("/", (req, res) => {
    Model.find(req.query.query, req.query.fields, callback(res))
  })

  router.get("/:id", (req, res) => {
    Model.findById(req.params.id, callback(res));
  })
 
  router.put("/:id", (req, res) => {
    Model.findOneAndReplace(req.params.id, req.body, callback(res));
  })

  router.patch("/:id", (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, callback(res));
  })

  router.post("/", (req, res) => {
    const instance = new Model(req.body);
    Model.save(instance, callback(res));
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