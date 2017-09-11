import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},

  modules: {},

  actions,
  getters,

  mutations: {}
})
