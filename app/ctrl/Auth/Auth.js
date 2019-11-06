require('../../../app');

module.exports = class extends AbstractCtrl {
  extConstructor() {
    this.body = this.req.body;
  }
  //run - запускатьт
  //exect - реализация

  async exect() {
    let user = await UserManager.auth(this.body.login, this.body.password);
    return user;
  }
};
