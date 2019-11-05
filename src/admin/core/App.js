import __ from "./Emitter";
import helpers from "./helpers";
import "./Config";
import Request from "./Request";
import localStorageProxy from "./localStorageProxy";
import Load from "./Load";
import Router from "./Router";
import User from "./User";

import io from "socket.io-client";
global.io = io;

//global.Emitter = Emitter;
//global.TimeMinutes = TimeMinutes;

global.App = new (class {
  constructor() {
    this.Config = Config;
    this.Load = Load;
    this.User = User;
    this.Router = Router;
    this.isMobile = false;
    this.isTablet = false;
    this.isDesktop = false;
    this.AppVue; // Главный компонент
    this.beforeClose = [];
    this.detectDevice();
  }

  init() {
    Promise.all([this.initMain(), this.loadMainScript()]).then(
      ([data, Module]) => {
        return Module.init();
      }
    );
    window.onbeforeunload = e => App.beforeClose.forEach(val => val());
  }

  initMain() {
    this.User.init().then(data => {
      //this.Call.init();
    });
  }

  loadMainScript() {
    if (this.isDesktop) return this.Load.Module("MainDesktop");
    if (this.isMobile) return this.Load.Module("MainMobile");
  }

  detectDevice() {
    if (window.innerWidth <= 500) this.isMobile = true;
    else this.isDesktop = true;
  }

  pushBeforeClose(func) {
    this.beforeClose.push(func);
  }
})();

App.init();
