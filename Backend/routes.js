const express = require("./node_modules/express");
const routes = express.Router();
const instructors = require("./instrutors");

routes.get("/", function (req, res) {
  return res.redirect("/instructors");
});

routes.get("/instructors", function (req, res) {
  return res.render("instructors/index.njk");
});

routes.get("/instructors/create", function (req, res) {
  return res.render("instructors/create.njk");
});

routes.get("/instructors/:id", instructors.list);

routes.get("/instructors/:id/edit", instructors.edit);

routes.post("/instructors", instructors.create);

routes.get("/members", function (req, res) {
  return res.send("members");
});

module.exports = routes;
