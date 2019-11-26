require("../../../app");

module.exports = class extends AbstractCtrl {
  extConstructor() {
    this.body = this.req.body;
    this.user = this.req.User;
  }

  async exect() {
    if (!this.user) return erJson("Not auth");

    if (this.user.permission != "admin") return erJson("Permission problems");

    if (!this.body.schedule.length) return erJson("Schedule?");

    return await scheduleManager.saveMany(this.body.schedule);
  }
};
