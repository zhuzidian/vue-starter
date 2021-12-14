export default {
  namespaced: true,
  state: {
    account: null,
  },
  mutations: {
    setAccount(state, payload) {
      state.account = payload
    },
  },
  actions: {
    login({ commit }, { loginId, password }) {
      console.log("dispatch auth/login")
      commit("setAccount", { loginId, password })
    },
    logout({ commit }) {
      console.log("dispatch auth/logout")
      commit("setAccount", null)
    },
  },
}
