// Called when the user clicks on the browser action.
/* global chrome */

chrome.browserAction.onClicked.addListener(function (tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    var activeTab = tabs[0]
    chrome.tabs.sendMessage(activeTab.id, {'message': 'clicked_browser_action'})
    console.log(111, tabs)
  })
})

chrome.extension.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.action === 'openNewTab') {
      chrome.tabs.create({ url: request.url })
    }
  }
)
