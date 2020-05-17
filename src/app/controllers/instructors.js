const Instructor = require("../models/Instructor");
const { age, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    Instructor.all(function (instructors) {
      return res.render("instructors/index.njk", { instructors });
    });
  },

  create(req, res) {
    return res.render("instructors/create.njk");
  },

  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields!");
      }
    }

    Instructor.create(req.body, function (instructor) {
      return res.redirect(`/instructors/${instructor.id}`);
    });
  },

  show(req, res) {
    Instructor.find(req.params.id, function (instructor) {
      if (!instructor) return res.send("Instructor not found!");

      instructor.age = age(instructor.birth);
      instructor.services = instructor.services.split(",");
      instructor.created_at = date(instructor.created_at).birthBr;

      return res.render("instructors/show.njk", { instructor });
    });
  },

  edit(req, res) {
    Instructor.find(req.params.id, function (instructor) {
      if (!instructor) return res.send("Instructor not found!");

      instructor.birth = date(instructor.birth).iso;

      return res.render("instructors/edit.njk", { instructor });
    });
  },

  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields!");
      }
    }
  },

  delete(req, res) {
    return;
  },
};
