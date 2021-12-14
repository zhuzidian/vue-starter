import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"

import auth from "./modules/auth"

Vue.use(Vuex)

const modules = {
  auth,
}

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      paths: [
        "auth.account",
      ],
    }),
  ],
})
