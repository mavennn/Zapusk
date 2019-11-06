export default new (class {
  constructor() {
    this.listen();
  }

  isOpened() {
    return App.AppVue.MainVue.$refs.mpage.$data.opened;
  }

  open(options) {
    App.AppVue.MainVue.$refs.mpage.open(options);
  }
  getPages() {
    return App.AppVue.MainVue.$refs.mpage.$data.pages;
  }
  getCount() {
    return App.AppVue.MainVue.$refs.mpage.$data.counter;
  }
  closeAll() {
    App.AppVue.MainVue.$refs.mpage.closeAll();
  }
  closeLast() {
    App.AppVue.MainVue.$refs.mpage.closeLast();
  }
  closePath({ to, from, next }) {
    if (!this.isOpened()) return false;

    this.closeLast();

    if (this.getCount() > 0) return true;
  }

  listen() {
    App.Router.Emitter.on("main", ({ to, from, next }) => {
      this.open({
        component: "main-page"
      });
      next({ mpage: true });
    });
    App.Router.Emitter.on("profile", ({ to, from, next }) => {
      this.open({
        component: "profile",
        title:
          localStorageProxy.getItem("lang") == "en"
            ? "My profile"
            : "Мой профиль"
      });
      next({ mpage: true });
    });
    App.Router.Emitter.on("edit", ({ to, from, next }) => {
      this.open({
        component: "edit",
        title:
          localStorageProxy.getItem("lang") == "en"
            ? "edit profile"
            : "редактирование",
        back: false,
        menu: false
      });
      next({ mpage: true });
    });
    App.Router.Emitter.on("speaker", ({ to, from, next }) => {
      this.open({
        component: "person",
        title: localStorageProxy.getItem("lang") == "en" ? "Speaker" : "спикер"
      });
      next({ mpage: true });
    });
    App.Router.Emitter.on("user", ({ to, from, next }) => {
      this.open({
        component: "person",
        title: localStorageProxy.getItem("lang") == "en" ? "Person" : "участник"
      });
      next({ mpage: true });
    });
  }
})();
