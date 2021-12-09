import { createStore } from 'vuex'
import SessionStorage from '../utils/session-storage.js'
const USER = "USER"

const store = createStore({
  state: {
    user: SessionStorage.get(USER) || {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      SessionStorage.set(USER, user);
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store;