const { age, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    return res.render("instructors/index.njk", {
      instructors: data.instructors,
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

    let { avatar_url, birth, name, services, gender } = req.body;

    return;
  },

  show(req, res) {
    return;
  },

  edit(req, res) {
    return;
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
