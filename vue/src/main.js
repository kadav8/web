import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './routes.js'
import store from './store.js'

Vue.use(VueRouter)

new Vue({
  el: '#app',
  store,
  router: new VueRouter({
    routes: routes
  }),
  template: '<App/>',
  components: { App }
})

Vue.prototype.$alertSuccess = function (msg) {
  store.commit('pushNotification', {
    message: msg,
    type: 'alert-success'
  })
}

Vue.prototype.$alertError = function (msg) {
  store.commit('pushNotification', {
    message: msg,
    type: 'alert-error'
  })
}