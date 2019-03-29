// eslint-disable-next-line no-unused-vars
var db = require("../models");

module.exports = function(app) {
  // Load index page
  // Default Code - Load index page
  app.get("/", function(req, res) {
    res.render("index", {});
  });

  // app.get("/createpost", function(req, res) {
  //   res.render("createpost", {});
  // });

  app.get("/", function(req, res) {
    db.Post.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/angels", function(req, res) {
    res.render("angels", {});
  });

  app.get("/beggars", function(req, res) {
    res.render("beggars", {});
  });

  app.get("/nosey", function(req, res) {
    res.render("nosey", {});
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
