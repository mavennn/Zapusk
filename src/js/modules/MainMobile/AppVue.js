import LoadingC from "@Components/mobile/Loading.vue";
import AmDropdown from "@Components/all/AmDropdown.vue";
import LoadingFull from "@Components/mobile/LoadingFullPage.vue";
import MainVue from "./App.vue";
import infiniteScroll from "vue-infinite-scroll";
import Mheader from "@Components/mobile/mheader.vue";

global.LoadingC = LoadingC;
global.AmDropdown = AmDropdown;
global.LoadingFull = LoadingFull;

export default new (class {
  constructor() {}

  init() {
    Vue.use(infiniteScroll);
    Vue.component("mheader", Mheader);
    Vue.component("loadingc", LoadingC);
    Vue.component("am-dropdown", AmDropdown);
    this.MainVue = new Vue(MainVue);
    this.MainVue.$mount("#app");
  }

  getVue() {
    return this.MainVue;
  }

  pushComponent() {}
})();
