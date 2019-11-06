global.app;
global.express = require("express");

const bodyParser = require("body-parser");

global.HttpServer = new (class {
  constructor() {
    this.app = express();
    global.app = this.app;
    app.use(require("cookie-parser")());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    this.http = require("http").Server(this.app);
  }

  listern(port) {
    return new Promise(res => this.http.listen(port, () => res()));
  }
})();
