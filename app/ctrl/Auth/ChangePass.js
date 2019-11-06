require('../../../app');

module.exports = class extends AbstractCtrl {
  extConstructor() {
    this.body = this.req.body;
  }

  //run - запускатьт
  //exect - реализация

  async exect() {
    let user = await UserManager.changePassword(
      this.body.token,
      this.body.pass
    );
    return user;
  }
};
