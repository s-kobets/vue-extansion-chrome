// the background script runs all the time and serves as a central message
// hub for each vue devtools (panel + proxy + backend) instance.
/* global chrome */

console.log(chrome.browserAction, chrome.extension)
chrome.browserAction.onClicked.addListener(function (tab) { // Fired when User Clicks ICON

  // if (tab.url.indexOf("https://www.google.co.in/") != -1) { // Inspect whether the place where user clicked matches with our list of URL
  //   chrome.tabs.executeScript(tab.id, {
  //     'file': 'contentscript.js'
  //   }, function () { // Execute your code
  //     console.log("Script Executed .. "); // Notification on Completion
  //   });
  // }

  // for popup window
  // const bkg = chrome.extension.getBackgroundPage()
  // bkg.console.log(tab)

  chrome.browserAction.setPopup({popup: 'index.html'})

  console.log('click', tab)
})
