require('../../app');

app.post("/api/user/user-list", ctrl.Users.List.run());
app.post("/api/user/getbyid", ctrl.Users.GetById.run());
app.post("/api/user/getSpeakerList", ctrl.Users.GetSpeakers.run());
app.post("/api/user/getSpeakerListShort", ctrl.Users.GetSpeakersShort.run());
app.post("/api/user/edit", ctrl.Users.Edit.run());
app.post("/api/user/remove", ctrl.Users.Remove.run());
app.post("/api/user/removeSpeaker", ctrl.Users.RemoveSpeaker.run());
app.post("/api/user/addUser", ctrl.Users.AddUser.run());
app.post("/api/user/addSpeaker", ctrl.Users.AddSpeaker.run());

app.post("/api/user/tags/get", ctrl.Users.GetTags.run());

app.post("/api/user/schedule/list", ctrl.Schedule.List.run());

app.post("/api/user/appointment/make", ctrl.Request.SendRequest.run());
app.post("/api/user/schedule/list", ctrl.Schedule.List.run());

app.post("/api/user/requests/forUser", ctrl.Request.ForUser.run());
app.post("/api/user/meetings/forUser", ctrl.Meeting.ForUser.run());

app.get("/api/user/get", async function(req, res) {
  res.send(
    suJson({
      user: req.User.forClient()
    })
  );
});

app.post("/api/user/loadphoto/:filename", async (req, res) => {
  let filePath = rootPath + "/public/img/photos/" + req.params.filename;
  let _id = req.params.filename.split(".")[0];
  let user = await userModel.findOne({ _id });
  if (empty(user)) return res.send(erJson("Auth not found"));

  if (
    user._id.toString() != req.User._id.toString() &&
    req.User.permission != "admin"
  )
    return res.send(erJson("Access denied"));
  user.photo = "/src/img/photos/" + req.params.filename;
  await user.save();
  UserManager.addToCache(user);
  let fileStream = fs.createWriteStream(filePath);
  return new Promise((resolve, reject) => {
    req
      .on("error", err => {
        reject("error");
      })
      .on("close", () => {
        reject("close");
      });
    req.pipe(fileStream);
    req.on("end", function() {
      resolve(filePath);
      res.send(suJson("su"));
    });
  });
});
