require('../../app');

const handlebars = require("express-handlebars");
const path = require("path");

global.default_views_dir = path.join(rootPath, "views/pages");

global.hbs = handlebars.create({
  extname: "hbs",
  defaultLayout: "vue",
  layoutsDir: rootPath + "/views/layouts/",
  partialsDir: rootPath + "/views/partials/"
});

app.engine("hbs", hbs.engine);
app.set("views", default_views_dir);
app.set("view engine", "hbs");
