import Vue from 'vue'

import Responsiveness from 'plugins/responsiveness'

import App from './App.vue'

import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(Responsiveness)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('GEN_POSTS')
  }
}).$mount('#app')
