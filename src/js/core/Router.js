import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

export default new (class {
  constructor() {
    this.currentPage;
    this.Emitter = new Emitter();
    this.Router = new VueRouter({
      mode: "history",
      routes: this.completeRoutes()
    });
    //this.isBack = false;
    this.lastUrl = [];
    this.listern();
  }

  completeRoutes() {
    return [
      { path: "/", name: "agenda" },
      { path: "/agenda", name: "agenda" },
      { path: "/speakers", name: "speakers" },
      { path: "/schedulled", name: "schedulled" },
      { path: "/sign", name: "sign" },
      { path: "/profile", name: "profile" },
      { path: "/speaker/:id", name: "speaker" },
      { path: "/user/:id", name: "user" },
      { path: "/edit", name: "edit" },

      { path: "/meetings", name: "meetings" },
      { path: "/hall", name: "hall" },
      { path: "/adminagenda", name: "adminagenda" }
    ];
  }

  getCurrentPath() {
    return this.Router.history.current.path;
  }

  listern() {
    this.Router.beforeEach((to, from, nextRoute) => {
      let next = () => nextRoute();

      if (to.name) this.Emitter.emit(to.name, { to, from, next });
      else this.Emitter.emit("404", { to, from, next });

      window.scrollTo(0, 0);
    });
  }

  push(...ags) {
    setTimeout(() => this.Router.push(...ags), 0.01); // если не ставить задержку back срабатывает раньше
  }

  back() {
    this.Router.back();
  }
})();
