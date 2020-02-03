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
    tokenPending: null,
    tokenStatus: null,
    users: [],
    usersPending: null,
    usersStatus: null,
    posts: [],
    postsPending: null,
    postsStatus: null,
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
    addPosts: (state, payload) => {
      payload.posts.forEach((post) => {
        state.posts.push(post);
      })
    },
    clearPosts: (state) => {
      state.posts.splice(0, state.posts.length);
    },
    setPostsPending: (state, payload) => {
      Vue.set(state, 'postsPending', payload);
    },
    setPostsStatus: (state, payload) => {
      Vue.set(state, 'postsStatus', payload);
    },
    setToken: (state, payload) => {
      Vue.set(state, 'token', payload);
    },
    setTokenPending: (state, payload) => {
      Vue.set(state, 'tokenPending', payload);
    },
    setTokenStatus: (state, payload) => {
      Vue.set(state, 'tokenStatus', payload);
    }
  },
  actions: {
    postPublic: (context) => {
      context.commit('setPostsPending', true);
      const options = {
        'url': `${context.state.api}/post/public`,
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
        }
      }
      axios(options)
      .then((response) => {
        context.commit('addPosts', response.data)
        context.commit('setTokenStatus', true);
      })
      .catch((error) => {
        console.log(error);
        context.commit('setPostsStatus', false);
      })
      .finally(() => {
        context.commit('setPostsPending', false);
      })
    },
    authLogin: (context, { username, password }) => {
      context.commit('setTokenPending', true);
      context.commit('setToken', null);
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
        context.commit('setToken', response.data.token);
        context.commit('setTokenStatus', true);
        context.commit('clearPosts');
      })
      .catch((error) => {
        console.log(error);
        context.commit('setToken', null);
        context.commit('setTokenStatus', false);
      })
      .finally(() => {
        context.commit('setTokenPending', false);
      })
    },
    authLogout: (context) => {
      context.commit('setToken', null);
      context.commit('setTokenStatus', true);
      context.commit('setTokenPending', false);
      context.commit('clearPosts');
      context.dispatch('postPublic');
    },
    authSignup: (context, { username, password, email, name }) => {
      context.commit('setTokenPending', true);
      context.commit('setToken', null);
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
        context.commit('setToken', response.data.token);
        context.commit('setTokenStatus', true);
        context.commit('clearPosts');
      })
      .catch((error) => {
        console.log(error);
        context.commit('setToken', null);
        context.commit('setTokenStatus', false);
      })
      .finally(() => {
        context.commit('setTokenPending', false);
      })
    }
  },
  modules: {
  }
})
