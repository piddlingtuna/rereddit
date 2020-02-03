import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: 'http://127.0.0.1:5000',
    about: [
      {
        title: 'Author',
        content: 'Michael Gribben'
      }, {
        title: 'Tech',
        content: 'Javascript, Vue.js, Vue.js Router, Vuex, Buefy'
      }
    ],
    contact: [
      {
        title: 'Email',
        content: 'michaelgribbeninfo@gmail.com'
      }
    ],
    token: null,
    token_pending: null,
    token_status: null,
    users: [],
    users_pending: null,
    users_status: null,
    posts: [],
    posts_pending: null,
    posts_status: null,
  },
  getters: {
    getToken: (state) => {
      return state.token;
    },
    getAbout: (state) => {
      return state.about
    },
    getContact: (state) => {
      return state.contact;
    },
    getUsers: (state) => {
      return state.users;
    },
    getUser: (state) => (username) => {
      return state.posts.find((user) => {
        return user.username === username;
      });
    },
    getPosts: (state) => {
      return state.posts;
    },
    getPost: (state) => (id) => {
      return state.posts.find((post) => {
        return post.id == id; // no type checking since param
      });
    }
  },
  mutations: {
    add_posts: (state, payload) => {
      payload.posts.forEach((post) => {
        state.posts.push(post);
      })
    },
    clear_posts: (state) => {
      state.posts.splice(0, state.posts.length);
    },
    set_posts_pending: (state, payload) => {
      Vue.set(state, 'posts_pending', payload);
    },
    set_posts_status: (state, payload) => {
      Vue.set(state, 'posts_status', payload);
    },
    set_token: (state, payload) => {
      Vue.set(state, 'token', payload);
    },
    set_token_pending: (state, payload) => {
      Vue.set(state, 'token_pending', payload);
    },
    set_token_status: (state, payload) => {
      Vue.set(state, 'token_status', payload);
    }
  },
  actions: {
    post_public: (context) => {
      context.commit('set_posts_pending', true);
      const options = {
        'url': `${context.state.api}/post/public`,
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
        }
      }
      axios(options)
      .then((response) => {
        context.commit('add_posts', response.data)
        context.commit('set_token_status', true);
      })
      .catch((error) => {
        console.log(error);
        context.commit('set_posts_status', false);
      })
      .finally(() => {
        context.commit('set_posts_pending', false);
      })
    },
    auth_login: (context, { username, password }) => {
      context.commit('set_token_pending', true);
      context.commit('set_token', null);
      const options = {
        'url': `${context.state.api}/auth/login`,
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json',
        },
        'data': {
          username: username,
          password: password
        }
      }
      axios(options)
      .then((response) => {
        context.commit('set_token', response.data.token);
        context.commit('set_token_status', true);
        context.commit('clear_posts');
      })
      .catch((error) => {
        console.log(error);
        context.commit('set_token', null);
        context.commit('set_token_status', false);
      })
      .finally(() => {
        context.commit('set_token_pending', false);
      })
    },
    auth_logout: (context) => {
      context.commit('set_token', null);
      context.commit('set_token_status', true);
      context.commit('set_token_pending', false);
      context.commit('clear_posts');
      context.dispatch('post_public');
    },
    auth_signup: (context, { username, password, email, name }) => {
      context.commit('set_token_pending', true);
      context.commit('set_token', null);
      const options = {
        'url': `${context.state.api}/auth/signup`,
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json',
        },
        'data': {
          username: username,
          password: password,
          email: email,
          name: name
        }
      }
      axios(options)
      .then((response) => {
        context.commit('set_token', response.data.token);
        context.commit('set_token_status', true);
        context.commit('clear_posts');
      })
      .catch((error) => {
        console.log(error);
        context.commit('set_token', null);
        context.commit('set_token_status', false);
      })
      .finally(() => {
        context.commit('set_token_pending', false);
      })
    }
  },
  modules: {
  }
})
