const { age, date } = require("../../lib/utils");
const db = require("../../config/db");

module.exports = {
  index(req, res) {
    db.query(`SELECT * FROM instructors`, function (err, results) {
      if (err) return res.send("Database Error!");

      return res.render("instructors/index.njk", { instructors: results.rows });
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

    const query = `INSERT INTO instructors (
      avatar_url, 
      name, 
      birth, 
      services, 
      gender,
      created_at
    ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;

    const values = [
      req.body.avatar_url,
      req.body.name,
      date(req.body.birth).iso,
      req.body.services,
      req.body.gender,
      date(Date.now()).iso,
    ];

    db.query(query, values, function (err, results) {
      if (err) return res.send("Database Error!");
      return res.redirect(`/instructors/${rows[0].id}`);
    });

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
