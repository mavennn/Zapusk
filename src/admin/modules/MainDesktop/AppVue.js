import MainVue from "./App.vue";
import LoadingC from "@Components/mobile/Loading.vue";
import BackMpageBtn from "@Components/all/BackMpageBtn.vue";
import sblock from "@Components/desktop/Sblock.vue";
import ablock from "@Components/desktop/Ablock.vue";
import amDropdown from "@Components/all/AmDropdown.vue";

global.LoadingC = LoadingC;

export default new (class {
  constructor() {}

  init() {
    Vue.component("loadingc", LoadingC);
    Vue.component("sblock", sblock);
    Vue.component("ablock", ablock);
    Vue.component("amDropdown", amDropdown);
    Vue.component("back_mpage", BackMpageBtn);
    // 		Vue.component('formContact', formContact);
    this.MainVue = new Vue(MainVue);
    this.MainVue.$mount("#app");
  }

  getVue() {
    return this.MainVue;
  }

  pushComponent() {}
})();
