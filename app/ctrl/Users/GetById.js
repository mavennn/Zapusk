module.exports = class extends AbstractCtrl {
  extConstructor() {
    this.body = this.req.body;
    this.user = this.req.User;
  }

  //run - запускатьт
  //exect - реализация

  async exect() {
    if (empty(this.req.User)) return erJson("Access denied");

    if (empty(this.body.id)) return erJson("Id?");

    let usr = await UserManager.getById(this.body.id);
    if (this.user.permission == "admin") {
      return suJson(usr);
    }
    if (this.user.permission == "user") {
      if (usr.permission == "admin" || usr.permission == "user") {
        usr = {};
      } else {
        usr = usr.forClient();
        usr.email = "";
        usr.phone = "";
      }
    }
    if (this.user.permission == "speaker") {
      if (usr.permission != "admin") {
        usr = usr.forClient();
        usr.email = "";
        usr.phone = "";
      } else {
        usr = {};
      }
    }
    return suJson(usr);
  }
};
