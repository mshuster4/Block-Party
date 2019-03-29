var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/blockParty", function(req, res) {
    db.Blockparty.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/blockParty", function(req, res) {
    db.Blockparty.create({
      title: req.body.title,
      category: req.body.category,
      body: req.body.body,
    }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/blockParty/:id", function(req, res) {
    db.Blockparty.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
