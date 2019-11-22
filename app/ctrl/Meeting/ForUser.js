require("../../../app");

module.exports = class extends AbstractCtrl {
  extConstructor() {
    this.speakerId = this.req.body.speakerId;
    this.day = this.req.body.day;
    this.user = this.req.User;
  }

  //run - запускатьт
  //exect - реализация
  async exect() {
    if (!this.user) return erJson("Not authorized");

    if (!this.day) return erJson("Not today");

    let params;
    if (this.user.permission == "speaker") {
      params = {
        speaker: this.user._id,
        day: this.day,
        status: 1
      };
    } else {
      params = {
        user: this.user._id,
        day: this.day,
        status: 1
      };
    }

    let meetings = await meetingModel.find(params);
    let users = {};
    for (let meet of meetings) {
      if (this.user.permission == "speaker") {
        let sp = await userModel.findOne({ _id: meet.user });
        if (sp) {
          users[sp._id] = sp.forClient();
        }
      } else {
        let sp = await userModel.findOne({ _id: meet.speaker });
        if (sp) {
          users[sp._id] = sp.forClient();
        }
      }
    }
    return suJson({ meetings, users });
  }
};
