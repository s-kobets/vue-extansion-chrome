<template>
  <div id="app">
    <div>
      Hello Chrome Extansion
      <button @click="onClick">Google</button>
    </div>
  </div>
</template>

<script>
// const bkg = chrome.extension.getBackgroundPage() // for console.log()

export default {
  name: 'app',

  methods: {
    onClick() {
      chrome.extension.sendMessage({
        action: 'openNewTab',
        url: 'https://www.google.com'
      })
    }
  },

  components: {},
}
</script>

<style src="./assets/css/index.css" lang="postcss" />
