import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSidebarVisible: true,
    notifications: []
  },
  
  mutations: {
    changeSidebarVisibility(state) {
      state.isSidebarVisible = !state.isSidebarVisible
    },
    pushNotification(state, msg) {
      state.notifications.push(msg);
      setTimeout(() => {
        for (let i = 0; i < state.notifications.length; i++) {
          if (state.notifications[i] === msg) {
            state.notifications.splice(i, 1)
          }
        }
      }, 5000);
    }
  }
})

