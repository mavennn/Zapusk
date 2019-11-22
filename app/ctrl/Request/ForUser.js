require('../../../app');

module.exports = class extends AbstractCtrl {
  extConstructor() {
    this.body = this.req.body;
    this.user = this.req.User;
    this.day = this.body.day;
  }

  //run - запускатьт
  //exect - реализация
  async exect() {
    if (!this.user) return erJson("Not auth");

    let requests = await requestModel.find({
      user: this.user._id,
      day: this.day
    });

    let users = {};
    for (let reqs of requests) {

      let sp = await userModel.findOne({ _id: reqs.speaker });
      if (sp) {
        users[sp._id] = sp.forClient();
      }
    }

    return suJson({ requests, users });
  }
};
