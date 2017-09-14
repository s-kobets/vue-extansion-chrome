// Inform the background page that
// this tab should have a page-action
/* global chrome */

window.addEventListener('load', function () {
  // сlick at icon extansion
  chrome.extension.sendMessage({
    action: 'isClassBet',
    isClassBet: document.getElementById('bet_extansion')
  })

  chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
    console.log(12343, 'content, response', request)
    switch (request.action) {
      case 'initialization':
        console.log('gogi')
        break
    }
  })
}, true)
