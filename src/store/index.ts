import Vue from 'vue'
import Vuex from 'vuex'
import App from '@/app/App';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    app: App
  },
  mutations: {
    logout(state) {
      state.app.logout()
    }
  },
  actions: {
  },
  modules: {
  }
})
