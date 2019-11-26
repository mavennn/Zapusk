require("../../../app");

module.exports = class extends AbstractCtrl {
  extConstructor() {
    this.speakerId = this.req.body.speakerId;
    this.userId = this.req.body.userId;
    this.status = this.req.body.status;

    this.day = this.req.body.day;
    this.user = this.req.User;
  }

  //run - запускатьт
  //exect - реализация
  async exect() {
    if (!this.user) return erJson("Not authorized");

    if (this.user.permission != "admin") return erJson("Not admin");

    let params = {};
    if (this.speakerId) params.speaker = this.speakerId;

    if (this.userId) params.user = this.userId;

    if (this.status) params.status = this.status;

    if (this.day) params.day = this.day;

    let meetings = await meetingModel.find(params);

    let users = {};
    for (let meet of meetings) {
      if (!empty(meet.user)) {
        let sp = await userModel.findOne({ _id: meet.user });
        if (sp) {
          users[sp._id] = sp;
        }
      }
    }

    return suJson({ meetings, users });
  }
};
