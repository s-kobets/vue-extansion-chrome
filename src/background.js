// Called when the user clicks on the browser action.
/* global chrome */

chrome.browserAction.onClicked.addListener((tab) => {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    var activeTab = tabs[0]
    chrome.tabs.sendMessage(activeTab.id, {'text': 'clicked_browser_action'})
    console.log(111, tabs)
    chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, (domContent) => {
      console.log('I received the following DOM content:\n' + domContent)
    })
  })
})

// прослушивание событий / одноразовых запросов
chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  console.log('extension.onMessage', request)
  switch (request.action) {
    case 'openNewTab':
      chrome.tabs.create({ url: request.url })
      break
    case 'getDOM':
      sendResponse({dom: 'The dom that you want to get'})
      break
  }
})

// прослушивание событий / долговременных подключений
chrome.extension.onConnect.addListener((port) => {
  port.onMessage.addListener((message) => {
    // switch (port.name) {
    //   case "color-divs-port":
    //     colorDivs ()
    //   break
    // }
  })
})

chrome.runtime.onMessage.addListener(function (msg, sender) {
  // First, validate the message's structure
  if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
    // Enable the page-action for the requesting tab
    chrome.pageAction.show(sender.tab.id)
  }
})
