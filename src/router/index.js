import Vue from 'vue'
import VueRouter from 'vue-router'

import Responsiveness from 'views/Responsiveness'
import JsGrid from 'views/JsGrid'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'responsiveness',
    component: Responsiveness
  },
  {
    path: '/grid',
    name: 'grid',
    component: JsGrid
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router
