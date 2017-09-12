// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/* global chrome */
import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store/'

new Vue({
  // el: '#app',
  store,
  router,
  created () {
    console.log('+++ created +++')

    chrome.runtime.onMessage.addListener(
      function (request, sender, sendResponse) {
        console.log(request.message, sender, sendResponse)
      }
    )
  },
  render: h => h(App)
}).$mount('#app')
