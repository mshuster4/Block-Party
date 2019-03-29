var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.blockParty.findAll({}).then(function(blockParty) {
      res.render("index", {
        msg: "Welcome!",
        examples: blockParty
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/angels", function(req, res) {
    res.render("angels", {});
  });

  // app.get("/angels", function(req, res) {
  //   res.render("angels");
  // });

  // app.get("/beggars", function(req, res) {
  //   res.render("beggars");
  // });

  // app.get("/nosey", function(req, res) {
  //   res.render("nosey");
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
