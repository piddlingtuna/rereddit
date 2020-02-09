import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.config.productionTip = false
/*
import { library } from '@fortawesome/fontawesome-svg-core';
// internal icons
import { faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
    faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
    faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, faSort);
Vue.component('vue-fontawesome', FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
});
*/

Vue.use(Buefy);

import Navbar from '@/components/Navbar.vue';
import SignupModal from '@/components/SignupModal.vue';
import LoginModal from '@/components/LoginModal.vue';
import LogoutModal from '@/components/LogoutModal.vue';
import PostModal from '@/components/PostModal.vue';
import EditModal from '@/components/EditModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';
import FollowingModal from '@/components/FollowingModal.vue';
import CommentModal from '@/components/CommentModal.vue';
import EditProfileModal from '@/components/EditProfileModal.vue';
import Post from '@/components/Post.vue';
import Comment from '@/components/Comment.vue';
import Info from '@/components/Info.vue';

Vue.component('Navbar', Navbar);
Vue.component('SignupModal', SignupModal);
Vue.component('LoginModal', LoginModal);
Vue.component('LogoutModal', LogoutModal);
Vue.component('PostModal', PostModal);
Vue.component('EditModal', EditModal);
Vue.component('DeleteModal', DeleteModal);
Vue.component('FollowingModal', FollowingModal);
Vue.component('CommentModal', CommentModal);
Vue.component('EditProfileModal', EditProfileModal);
Vue.component('Post', Post);
Vue.component('Comment', Comment);
Vue.component('Info', Info);

Vue.mixin({
  methods: {
    pubDate: ((timestamp) => {
      const pub = new Date(parseFloat(timestamp) * 1000);
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return `Published ${pub.getHours()}:${pub.getMinutes()} ${days[pub.getDay()]}, ${pub.getDate()} ${months[pub.getMonth()]} ${pub.getFullYear()}`;
    })
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
