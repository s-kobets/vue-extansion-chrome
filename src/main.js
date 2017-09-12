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
    function setDOMInfo (info) {
      console.log(info)
      // document.getElementById('total').textContent = info.total
      // document.getElementById('inputs').textContent = info.inputs
      // document.getElementById('buttons').textContent = info.buttons
    }

    console.log('+++ created +++')
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      // ...and send a request for the DOM info...
      chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        // ...also specifying a callback to be called
        //    from the receiving end (content script)
        setDOMInfo
      )
    })
  },

  render: h => h(App)

}).$mount('#app')
