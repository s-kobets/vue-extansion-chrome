// Inform the background page that
// this tab should have a page-action
/* global chrome */

window.addEventListener('load', function () {
  const initialization = () => {
    console.log(22222, 'inizialize', document.body)
  }

  initialization()

  chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
    console.log(12343, 'content, response', request)
    switch (request.action) {
      case 'initialization':
        initialization()
        break
    }
  })

}, true)
