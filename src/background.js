// Called when the user clicks on the browser action.
/* global chrome */

window.onload = function () { // work for each click in ixon
  const bg = {}
  const xhr = new XMLHttpRequest()

  const ajax = (xhr, url, typeRequest, body) => {
    xhr.open(typeRequest, url, true)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.send(body)
  }
  // create image icon
  chrome.browserAction.setBadgeText({text: ''}) // empty text badge

  // set handler to tabs
  chrome.tabs.onUpdated.addListener((id, info, tab) => {
    // Полная загрузка страницы
    if (info && info.status === 'complete') {
      console.log(3345, 'onUpdated', bg, id, info, tab)

      // добавляем разметку в текущую вкладку
      if (!bg.isClassBet) {
        // chrome.tabs.executeScript(id,
        //   {code: `document.body.innerHTML += '<div class="bet_extansion disabled"><p>Hello Chrome Extansion</p><button><a href="https://google.ru" target="_blank">Google</a></button></div>'`},
        //   () => { console.log(4343, 'add Content') }
        // )
        console.log(80000, 'add HTML')
      }

      xhr.onreadystatechange = () => {
        console.log(xhr.readyState, xhr.status)
        if (xhr.readyState === 4 && xhr.status === 200) {
          bg.xnrResult = JSON.parse(xhr.responseText)
          chrome.browserAction.setBadgeText({text: '1'})

          chrome.extension.sendMessage({
            action: 'xnrResult',
            value: bg.xnrResult
          })
        } else {
          console.log('error Request')
        }
      }

      ajax(xhr, 'http://www.mocky.io/v2/59ba3efd0f00006601622752', 'GET')

      // open popup
      chrome.browserAction.setPopup({popup: 'index.html'})
     
      // save tab info if need
      bg.active_tab = tab

      // connect with new tab, and save object
      const port = chrome.tabs.connect(id)
      bg.port_info = port

      // run function in content
      chrome.extension.sendMessage({
        action: 'initialization',
        value: true
      })
    }

    console.log(bg) // tabId, windowId

  })

  // set handler to tabs (при клике на вкладку)
  chrome.tabs.onActivated.addListener((info) => { // {tabId, windowId}
    console.log(5555, 'onActivated', info)
    ajax(xhr, 'http://www.mocky.io/v2/59ba3efd0f00006601622752', 'GET')

  })

  // set handler to tabs:  need for seng objects
  chrome.extension.onConnect.addListener((port) => {
    console.log(6666, 'onConnect', port)
  })

  // set handler to extention on icon click
  chrome.browserAction.onClicked.addListener((tab) => {
    console.log(7777, 'onClicked', tab)
  })

  // прослушивание событий / одноразовых запросов
  chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
    console.log(1111, 'extension.onMessage', request)
    switch (request.action) {
      case 'openNewTab':
        chrome.tabs.create({ url: request.url })
        break
      case 'getDOM':
        sendResponse({dom: 'The dom that you want to get'})
        break
      case 'dom-loaded':
        console.log(request.data, request.data.getElementsByTagName('body')[0])
        break
      // openPopup
      case 'isClassBet':
        ajax(xhr, 'http://www.mocky.io/v2/59ba3efd0f00006601622752', 'GET')
        bg.isClassBet = request.isClassBet
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

}
