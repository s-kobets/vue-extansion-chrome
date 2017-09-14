// Inform the background page that
// this tab should have a page-action
/* global chrome */

window.addEventListener('load', function () {
  // сlick at icon extansion
  chrome.extension.sendMessage({
    action: 'isClassBet',
    isClassBet: document.getElementById('bet_extansion')
  })

  function addPrognosis (result) {
    const div = document.createElement('div')
    let dataResponse = ''
    result.forEach((match) => {
      dataResponse += `<span>${match.event.name}</span>-<span>${match.event.kind.name}</span>=<span>${match.coefficient}</span>`
    })

    div.innerHtml = dataResponse
    return div
  }

  function createParent (active) {
    const div = document.createElement('div')
    if (active) {
      div.className = 'bet_extansion'
    } else {
      div.className = 'bet_extansion disabled'
    }
    return div
  }

  function createButton () {
    const a = document.createElement('a')
    a.innerText = 'Google'
    a.setAttribute('href', 'https://google.ru')
    a.setAttribute('target', '_blank')
    return a
  }

  // document - deduce at page popup and curentTab
  if (!document.getElementById('app')) {
    const div = createParent()
    const body = document.querySelectorAll('body')[0]
    div.appendChild(createButton())
    body.appendChild(div)
    console.log(67234, 'мы на странице вкладки', body, div)
  }

  chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
    console.log(12343, 'content, response', request)
    switch (request.action) {
      case 'xhrResult':
        debugger
        const betExtansion = document.querySelectorAll('.bet_extansion')[0]
        if (!betExtansion) {
          break
        }
        const button = createButton()
        console.log(1114566, betExtansion)
        betExtansion.classList.remove('disabled')
        betExtansion.insertBefore(addPrognosis(request.value), button)
        break
    }
  })
}, true)
