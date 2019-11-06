export default new (class {
  constructor() {
    this.Emitter = new Emitter();
  }

  open(options) {
    return new Promise((res, rej) => {
      options.prom = { res, rej };
      App.AppVue.MainVue.$refs.spage.open(options);
    });
  }
  close() {
    App.AppVue.MainVue.$refs.spage.close();
  }
})();
