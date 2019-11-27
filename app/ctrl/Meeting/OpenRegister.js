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

    if (this.user.permission != "admin") return erJson("Admin?");

    let speaker = await userModel.findOne({
      _id: this.speakerId,
      permission: "speaker"
    });
    if (empty(speaker)) return erJson("Speaker not found");

    if (
          speaker.hardSkills.length === 0 &&
          speaker.softSkills.length === 0
    )
      return erJson("Заполните теги!");

    if (
      speaker.recording_status == 2 ||
      speaker.recording_status == 3
    )
      return erJson("Recording is already open");

    let time_start = this.day === 1 ? "12:00" : "16:00";

    const check = await meetingManager.calc({
      day: this.day,
      time_start,
      speaker: this.speakerId
    });
    if (!isJson(check)) return check;

    speaker.recording_status = 2;
    await speaker.save();
    return suJson("su");
  }
};