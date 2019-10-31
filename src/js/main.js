import Vue from 'vue';
global.Vue = Vue;
import Vuex from 'vuex';
global.Vue.use(Vuex);
global.Vuex = Vuex;
import App from './core/App';
import './core/Cookie.js';
