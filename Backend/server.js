const express = require("./node_modules/express");
const nunjucks = require("./node_modules/nunjucks");
const routes = require("./routes");

const server = express();

server.use(express.static("public"));
server.use(routes);

server.set("view_engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.listen(5000, function () {
  console.log("server is running");
});
