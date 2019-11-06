require('../../../app');

module.exports = class extends AbstractCtrl {
  extConstructor() {
    this.body = this.req.body;
    this.user = this.req.User;
  }

  //run - запускатьт
  //exect - реализация

  async exect() {
    if (empty(this.req.User)) return erJson("Access denied");

    if (this.req.User.permission != "admin") return erJson("Access denied");

    if (empty(this.req.body.tagsId)) return erJson("Tags id is not defined");

    let userId = this.req.body.userId;

    return await UserManager.setHiddenTags({ userId, tagsId });
  }
};
