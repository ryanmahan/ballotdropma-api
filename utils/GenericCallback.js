module.exports = (res) => (err, doc) => {
  if (err) {
    logger.error(err);
    res.status(500).json(err);
  }
  else if (doc) res.json(doc).status(2000);
  else res.status(404);
};