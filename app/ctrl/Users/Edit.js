module.exports = class extends AbstractCtrl {
  extConstructor() {
    this.body = this.req.body;
    this.user = this.req.User;
  }

  //run - запускатьт
  //exect - реализация

  async exect() {
    if (empty(this.req.User)) return erJson("Access denied");

    if (empty(this.req.body)) return erJson("Some data?");

    let id = this.req.body._id || this.req.User._id;
    if (this.req.User.permission != "admin") {
      id = this.req.User._id;
    }

    return await UserManager.edit(id, this.req.body);
  }
};
