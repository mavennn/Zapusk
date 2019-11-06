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

    let speakers = await userModel.find({ permission: "speaker" });
    speakers = speakers.map(val => {
      const cntr = tagsManager.country.filter(v => v._id == val.country);
      const countryName = cntr.length > 0 ? cntr[0].name : "";
      val = val.forClient();
      val.countryName = countryName;
      return val;
    });

    return suJson(speakers);
  }
};
