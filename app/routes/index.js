require('../../app');

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

  res.send({ meetings, users }); // res.send({})
});

app.post("/meetings/getBlocks", async (req, res) => {

  let blocks = await blockModel.find({});
  if(empty(blocks)) return erJson("No blocks");
  res.send({ blocks })

});

app.post("/meetings/getSpeakers", async (req, res) => {
  let speakers = await userModel.find({ permission: "speaker"});
  if(empty(speakers)) return erJson("No speakers");

  speakers = speakers.map(sp => {
    return {_id: sp._id, name: sp.name, sname: sp.sname, block: sp.block, sortedRequest: []}
  });

  res.send(speakers)
});

app.post("/meetings/getRequests", async  (req, res) => {
  let requests = await requestModel.find({});
  if (empty(requests)) return erJson("Записей нет");

  let n = requests.map(async r => {
    let user_id = r._id;
    let user = await userModel.find({ _id: user_id });
    return user;
  });

  res.send(requests);
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
