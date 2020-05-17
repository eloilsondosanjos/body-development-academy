const { age, date } = require("../../lib/utils");
const db = require("../../config/db");

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM instructors`, function (err, results) {
      if (err) return res.send("Database Error!");

      callback(results.rows);
    });
  },
  create(data, callback) {
    const query = `INSERT INTO instructors (
        avatar_url, 
        name, 
        birth, 
        services, 
        gender,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.services,
      data.gender,
      date(Date.now()).iso,
    ];

    db.query(query, values, function (err, results) {
      if (err) return res.send("Database Error!");

      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(
      `SELECT * 
    FROM instructors 
    WHERE id = $1`,
      [id],
      function (err, results) {
        if (err) return res.send("Database Error!");

        callback(results.rows[0]);
      }
    );
  },
};