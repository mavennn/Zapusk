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
      { path: "/admin/", name: "main" },
      { path: "/admin/speakers", name: "speakers" },
      { path: "/admin/users", name: "users" },
      { path: "/admin/schedule", name: "schedule" },
      { path: "/admin/meetimes", name: "meetimes" },
      { path: "/admin/statistic", name: "statistic" }
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
