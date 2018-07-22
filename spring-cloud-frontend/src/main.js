import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './routes.js'
import store from './store.js'
import moment from 'moment'

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

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DD h:mm:ss a')
  }
})