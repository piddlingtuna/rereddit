import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.config.productionTip = false

Vue.use(Buefy)

import Navbar from '@/components/Navbar.vue';
import Post from '@/components/Post.vue';
import Info from '@/components/Info.vue';

Vue.component('Navbar', Navbar);
Vue.component('Post', Post);
Vue.component('Info', Info);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
