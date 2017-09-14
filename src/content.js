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

    div.innerHTML = dataResponse
    div.className = 'bet_extansion_content'
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
        const betExtansion = document.querySelectorAll('.bet_extansion')[0]
        const betExtansionContent = document.querySelectorAll('.bet_extansion_content')[0]
        if (!betExtansion) {
          break
        }
        if (betExtansionContent) {
          betExtansion.removeChild(betExtansionContent)
        }
        const button = betExtansion.querySelectorAll('a')[0]
        betExtansion.classList.remove('disabled')
        betExtansion.insertBefore(addPrognosis(request.value.result), button)
        break
    }
  })
}, true)
