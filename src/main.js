// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/* global chrome */
import Vue from 'vue'

import App from './App'
import store from './store/'

new Vue({
  store,
  created () {
  },

  render: h => h(App)

}).$mount('#app')
