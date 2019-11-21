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
      // !speaker.wsrProducts.length &&
      // !speaker.partnership.country.length &&
      // !speaker.partnership.partnershipMode.length &&
      // !speaker.partnership.bestPractice.length &&
      // !speaker.partnership.industry.length &&
      // !speaker.partnership.role.length
         !speaker.hardSkills.length || !speaker.softSkills.length
    )
      return erJson("Заполните теги!");

    if (
      speaker.recording_status[`day${this.day}`] == 2 ||
      speaker.recording_status[`day${this.day}`] == 3
    )
      return erJson("Recording is already open");

    let time_start = this.day == 1 ? "12:07" : "16:07";

    const check = await meetingManager.calc({
      day: this.day,
      time_start,
      speaker: this.speakerId
    });
    if (!isJson(check)) return check;

    speaker.recording_status[`day${this.day}`] = 2;
    await speaker.save();
    return suJson("su");
  }
};
