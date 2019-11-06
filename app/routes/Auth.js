require('../../app');

app.get("/recovery/:token", (req, res) => {
  res.template("login").render("index", {
    modules_url: toJson({ auth: config.modulesUrl.auth }),
    mode: config.get("host.env")
  });
});

app.all(["/admin", "/admin/*"], async (req, res, next) => {
  if (req.url == "/admin/auth/") return next();
  if (empty(req.cookies.token)) return res.redirect("/admin/auth/");
  let User = await UserManager.checkAdmin(req.cookies.token);

  if (!isJson(User)) return res.redirect("/admin/auth/");
  User = ans(User);
  req.User = User;

  next();
});
app.get("/admin/auth/", (req, res) => {
  res.template("login").render("login", {
    modules_url: toJson(config.modulesUrl),
    mode: config.get("host.env")
  });
});

app.all("/*", async (req, res, next) => {
  //backup
  if (req.url == "/sign") return next();
  if (req.url == "/api/auth") return next();
  if (req.url == "/api/reg") return next();
  if (req.url == "/api/forgot") return next();
  if (req.url == "/api/changepass") return next();
  if (req.url == "/api/auth-admin") return next();

  let token = req.cookies.token || req.get("App-Token");

  if (empty(token)) return res.redirect("/sign");

  let User = await UserManager.checkToken(token);
  if (isJson(User)) req.User = ans(User);

  next();
});

app.post("/api/auth", ctrl.Auth.Auth.run());
app.post("/api/auth-admin", ctrl.Auth.Admin.run());

app.post("/api/reg", ctrl.Auth.Reg.run());

app.post("/api/admin/reg", ctrl.Auth.Add.run());

app.post("/api/forgot", ctrl.Auth.Forgot.run());

app.post("/api/changepass", ctrl.Auth.ChangePass.run());

let AuthMid = Load.Middleware("Auth");

app.all("/api/admin/*", AuthMid.isAdmin);

app.post("/api/admin/auth", ctrl.Auth.AdminAuth.run());
