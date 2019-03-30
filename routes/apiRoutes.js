var db = require("../models");

module.exports = function(app) {
=======
  // Get examples
  app.get("/api/angelPost", function(req, res) {
    db.angelPost.findAll({}).then(function(dbPosts) {
      res.json(dbPosts);
    });
  });

  app.get("/api/noseyPost", function(req, res) {
    db.noseyPost.findAll({}).then(function(dbPosts) {
      res.json(dbPosts);
    });
  });

  app.get("/api/beggarPost", function(req, res) {
    db.beggarPost.findAll({}).then(function(dbPosts) {
      res.json(dbPosts);
    });
  });

  // Create a new example
  app.post("/api/angelPost", function(req, res) {
    db.angelPost
      .create({
        title: req.body.title,
        category: req.body.category,
        body: req.body.body
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.post("/api/noseyPost", function(req, res) {
    db.noseyPost
      .create({
        title: req.body.title,
        category: req.body.category,
        body: req.body.body
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.post("/api/beggarPost", function(req, res) {
    db.beggarPost
      .create({
        title: req.body.title,
        category: req.body.category,
        body: req.body.body
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // Delete an example by id
  app.delete("/api/angelPost/:id", function(req, res) {
    db.angelPost
      .destroy({ where: { id: req.params.id } })
      .then(function(dbExample) {
        res.json(dbExample);
      });
  });

  app.delete("/api/noseyPost/:id", function(req, res) {
    db.noseyPost
      .destroy({ where: { id: req.params.id } })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.delete("/api/beggarPost/:id", function(req, res) {
    db.beggarPost
      .destroy({ where: { id: req.params.id } })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });
};
