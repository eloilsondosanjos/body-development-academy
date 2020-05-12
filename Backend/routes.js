const express = require("./node_modules/express");
const routes = express.Router();
const instructors = require("./instrutors");

routes.get("/", function (req, res) {
  return res.redirect("/instructors");
});

routes.get("/instructors", instructors.index);

routes.get("/instructors/create", function (req, res) {
  return res.render("instructors/create.njk");
});

routes.get("/instructors/:id", instructors.list);

routes.get("/instructors/:id/edit", instructors.edit);

routes.post("/instructors", instructors.create);
routes.put("/instructors", instructors.update);
routes.delete("/instructors", instructors.delete);

routes.get("/members", function (req, res) {
  return res.send("members");
});

module.exports = routes;
