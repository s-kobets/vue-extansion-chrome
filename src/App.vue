<template>
  <div id="app">
    <div>
      Hello Chrome Extansion
      <div v-for="match in dataResponse.result">
        <span>{{match.event.name}}</span>-<span>{{match.event.kind.name}}</span>=<span>{{match.coefficient}}</span>
      </div>
      
      <button @click="onClick">Google</button>
    </div>
  </div>
</template>

<script>
// const bkg = chrome.extension.getBackgroundPage() // for console.log()

export default {
  name: 'app',

  data: () => ({
    dataResponse: {}
  }),

  methods: {
    onClick() {
      chrome.extension.sendMessage({
        action: 'openNewTab',
        url: 'https://www.google.com'
      })
    }
  },

  components: {},

  created() {
    chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
      console.log(989777, 'addListener vue', request)
      switch (request.action) {
        case 'xhrResult':
          this.dataResponse = request.value
          break
      }
    })

  }
}
</script>

<style src="./assets/css/index.css" lang="postcss" />
