import Vue from 'vue'
import Router from 'vue-router'

// const Home = (resolve) => require(['@/containers/Home'], resolve)

Vue.use(Router)

const routes = [
  // {path: '/', component: Home}
]

export default new Router({
  routes,
  mode: 'history',  // убираем решетку в url
  linkActiveClass: 'active'  // класс для активного линка
})
