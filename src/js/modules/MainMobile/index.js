import AppVue from "./AppVue.js";
import Mpage from "./Mpage.js";
import Menu from "./Menu.js";
import Spage from "./Spage.js";
import Hammer from "hammerjs";
global.Hammer = Hammer;

export default new (class {
  constructor() {}

  init() {
    this.initAppVue();
    this.initMpage();
    return Promise.resolve();
  }

  initAppVue() {
    App.AppVue = AppVue;
    AppVue.init();
  }

  initMpage() {
    App.Mpage = Mpage;
    App.Menu = Menu;
    App.Spage = Spage;
  }
})();
