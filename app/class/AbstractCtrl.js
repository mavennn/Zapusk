global.AbstractCtrl = class {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.ags;
    this.extConstructor();
  }

  extConstructor() {}

  async run(...ags) {
    this.ags = ags;
    try {
      let data = await this.exect();
      this.res.send(data);
    } catch (e) {
      if (e instanceof JsonError) return this.res.send(e.json);
      console.log(e);
      return this.res.send(erJson("Техническая ошибка"));
    }
  }

  exect() {}

  parseUser() {
    this.urlUser = this.req.url.split("/")[2];
  }
};
