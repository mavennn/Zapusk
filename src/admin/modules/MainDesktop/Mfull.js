export default new (class {
  constructor() {}
  open(options) {
    App.AppVue.MainVue.$refs.mfull.open(options);
  }
  close() {
    App.AppVue.MainVue.$refs.mfull.closeLast();
  }
  closePath() {
    return false;
  }
})();
