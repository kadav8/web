import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSidebarVisible: true,
    pagewidth: 0
  },
  mutations: {
    changeSidebarVisibility(state) {
      state.isSidebarVisible = !state.isSidebarVisible
    },
    setPageWidth(state, width) {
      state.pagewidth = width
    }
  }
})