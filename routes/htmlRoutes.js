var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index", {});
  });
  
  app.get("/angels", function(req, res) {
    res.render("angels", {});
  });
  
  app.get("/nosey", function(req, res) {
    res.render("nosey", {});
  });
  
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
