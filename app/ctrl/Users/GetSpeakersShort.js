module.exports = class extends AbstractCtrl {
  extConstructor() {
    this.body = this.req.body;
    this.user = this.req.User;
  }

  //run - запускатьт
  //exect - реализация

  async exect() {
    if (empty(this.req.User)) return erJson("Access denied");

    return suJson(await UserManager.getSpeakersShort());
  }
};
