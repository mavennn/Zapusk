Load.Route("Static");

app.use(function(req, res, next) {
  res.default_template = "vue";
  res.template = function(template = false) {
    if (!template) template = res.default_template;
    if (global.templates[template] == undefined)
      return res.send(404, "Шаблон не найден");
    return new global.templates[template](req, res);
  }.bind(res);

  next();
});

app.post("/meetings/list", async (req, res) => {
  let meetings = await meetingModel.find({ day: 1 });
  let users = [];
  meetings.map(val => {
    if (val.speaker) users.push(val.speaker);
    if (val.user) users.push(val.user);
  });
  users = await userModel.find({ _id: users });
  users = users.map(val => val.forClient());
  users = users.byKey("_id");
  res.send({ meetings, users }); //res.send({})
});

app.get("/meetings", (req, res) => {
  res.template().render("index");
});

app.get("/hall", (req, res) => {
  res.template().render("index");
});

app.get("/user/print/:id", (req, res) => {
  res.template("print").render("index");
});

Load.Route("Auth");
Load.Route("Users");
Load.Route("Crm");

app.get("/admin/", (req, res) => {
  res.template("vueadmin").render("index");
});
app.get("/admin/*", (req, res) => {
  res.template("vueadmin").render("index");
});

app.get("/*", (req, res) => {
  res.template().render("index");
});
