const { Pool } = require("pg");

module.exports = new Pool({
  user: "postgres",
  password: "elomar2411",
  host: "localhost",
  port: 5432,
  database: "gymmanager",
});
