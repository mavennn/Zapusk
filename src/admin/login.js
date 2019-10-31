import Vue from 'vue';
global.Vue = Vue;
import helpers from './core/helpers'
import './core/Config'
import Request from './core/Request'
import localStorageProxy from './core/localStorageProxy'
import Load from './core/Load'
import User from './core/User.js';
global.User = User;
import './core/Cookie.js';

import MainVue from './login/MainVue.vue'
(new Vue(MainVue)).$mount('#app');

