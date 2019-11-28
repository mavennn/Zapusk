require("../../../app");

module.exports = class extends AbstractCtrl {
  extConstructor() {
    // this.body = this.req.body;
  }

  //run - запускать
  //exect - реализация

  async exect() {
      console.log(" я тут ");
    // let user = await UserManager.add(this.body);
    return "adsfsdf";
  }
};
