// Inform the background page that
// this tab should have a page-action
/* global chrome */

window.addEventListener('load', function () {
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
    console.log(67234, 'мы на странице вкладки', body, div, window)

    // создаём экземпляр MutationObserver
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        console.log(mutation)
      })
    })

    // конфигурация нашего observer:
    const config = { attributes: true, childList: true, characterData: true }
    
    // передаём в качестве аргументов целевой элемент и его конфигурацию
    observer.observe(body, config)
    
    // позже можно остановить наблюдение
    // observer.disconnect();
  }

  const sendNotification = (title, options) => {
    // Проверим, поддерживает ли браузер HTML5 Notifications
    if (!('Notification' in window)) {
      console.log('Ваш браузер не поддерживает HTML Notifications, его необходимо обновить.')
    } else {
      // Если права есть, отправим уведомление
      const notification = new Notification(title, options)
      const clickFunc = () => { console.log('Пользователь кликнул на уведомление') }
      notification.onclick = clickFunc
    }
  }

  sendNotification('Верните Линуса!', {
    body: 'Тестирование HTML5 Notifications',
    dir: 'auto'
  })

  console.log(892498723984, 'дергаем контент скрипт')

  // сlick at icon extansion
  chrome.extension.sendMessage({
    action: 'isClassBet',
    isClassBet: document.getElementById('bet_extansion')
  })

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
