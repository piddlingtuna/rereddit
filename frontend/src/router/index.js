import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  }, {
    path: '/p/:id',
    name: 'p',
    component: () => import('../views/p.vue'),
    props: true
  }, {
    path: '/s/:sub',
    name: 's',
    component: () => import('../views/s.vue'),
    props: true
  }, {
    path: '/u/:username',
    name: 'u',
    component: () => import('../views/u.vue'),
    props: true
  }, {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  }, {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/Contact.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
