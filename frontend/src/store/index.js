import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
// import * as Cookies from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['token', 'profile'],
    })
  ],
  state: {
    api: 'http://127.0.0.1:5000',
    token: null,
    profile: null,
    about: [
      {
        title: 'Author',
        content: 'Michael Gribben'
      }, {
        title: 'Frontend',
        content: 'Javascript, Vue.js, Vue Ruter, Vuex, Vuex Persistedstate, Buefy'
      }, {
        title: 'Backend',
        content: 'Python, Flask'
      }
    ],
    contact: [
      {
        title: 'Email',
        content: 'michaelgribbeninfo@gmail.com'
      }
    ]
  },
  getters: {
    getApi: (state) => {
      return state.api;
    },
    getToken: (state) => {
      return state.token;
    },
    getProfile: (state) => {
      return state.profile;
    },
    getAbout: (state) => {
      return state.about;
    },
    getContact: (state) => {
      return state.contact;
    }
  },
  mutations: {
    setToken: (state, payload) => {
      Vue.set(state, 'token', payload);
    },
    setProfile: (state, payload) => {
      Vue.set(state, 'profile', payload);
    },
    addFollow: (state, id) => {
      state.profile.following.push(id);
    },
    removeFollow: (state, id) => {
      state.profile.following.splice(state.profile.following.indexOf(id), 1);
    }
  }
})











/*
postGet: (context, { id }) => {
  if (this.state.posts.some((post) => {
    return post.id == id; // no type checking since param
  })) {
    return;
  }
  const options = {
    url: `${context.state.api}/post?id=${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${context.state.token}`
    },
  }
  context.commit('setPostPending', true);
  axios(options)
  .then((response) => {
    console.log(response);
    context.commit('setPostStatus', true);
    context.commit('addPosts', response.data);
  })
  .catch((error) => {
    console.log(error);
    context.commit('setPostStatus', false);
  })
  .finally(() => {
    context.commit('setPostPending', false);
  })
},
postPost: (context, { payload }) => {
  const options = {
    url: `${context.state.api}/post`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${context.state.token}`
    },
    data: {
      payload: payload
    }
  }
  context.commit('setPostPending', true);
  axios(options)
  .then((response) => {
    console.log(response);
    context.commit('setPostStatus', true);
  })
  .catch((error) => {
    console.log(error);
    context.commit('setPostStatus', false);
  })
  .finally(() => {
    context.commit('setPostPending', false);
  })
},
postPut: (context, { id, payload }) => {
  const options = {
    url: `${context.state.api}/post?id=${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${context.state.token}`
    },
    data: {
      payload: payload
    }
  }
  context.commit('setPostPending', true);
  axios(options)
  .then((response) => {
    console.log(response);
    context.commit('setPostPending', true);
  })
  .catch((error) => {
    console.log(error);
    context.commit('setPostStatus', false);
  })
  .finally(() => {
    context.commit('setPostPending', false);
  })
},
postDelete: (context, { id }) => {
  const options = {
    url: `${context.state.api}/post?id=${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${context.state.token}`
    }
  }
  context.commit('setPostPending', true);
  axios(options)
  .then((response) => {
    console.log(response);
    context.commit('setPostStatus', true);
  })
  .catch((error) => {
    console.log(error);
    context.commit('setPostStatus', false);
  })
  .finally(() => {
    context.commit('setPostPending', false);
  })
},
votePut: (context, { id }) => {
  const options = {
    url: `${context.state.api}/post/vote?id=${id}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${context.state.token}`
    }
  }
  context.commit('setVotePending', true);
  axios(options)
  .then((response) => {
    console.log(response);
    context.commit('setVoteStatus', true);
  })
  .catch((error) => {
    console.log(error);
    context.commit('setVoteStatus', false);
  })
  .finally(() => {
    context.commit('setVotePending', false);
  })
},
voteDelete: (context, { id }) => {
  const options = {
    url: `${context.state.api}/post/vote?id=${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${context.state.token}`
    }
  }
  context.commit('setVotePending', true);
  axios(options)
  .then((response) => {
    console.log(response);
    context.commit('setVoteStatus', true);
  })
  .catch((error) => {
    console.log(error);
    context.commit('setVoteStatus', false);
  })
  .finally(() => {
    context.commit('setVotePending', false);
  })
},
commentPut: (context, {id, payload }) => {
  const options = {
    url: `${context.state.api}/post/comment?id=${id}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${context.state.token}`
    },
    data: {
      payload: payload
    }
  }
  context.commit('setCommentPending', true);
  axios(options)
  .then((response) => {
    console.log(response);
    context.commit('setCommentStatus', true);
  })
  .catch((error) => {
    console.log(error);
    context.commit('setCommentStatus', false);
  })
  .finally(() => {
    context.commit('setCommentPending', false);
  })
},
publicGet: (context) => {
  const options = {
    url: `${context.state.api}/post/public`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  context.commit('setPublicPending', true);
  axios(options)
  .then((response) => {
    console.log(response);
    context.commit('setPublicStatus', true);
    context.commit('setPublic', response.data.posts);
  })
  .catch((error) => {
    console.log(error);
    context.commit('setPublicStatus', true);
  })
  .finally(() => {
    context.commit('setPublicPending', false);
  })
},
loginPost: (context, { username, password }) => {
  const options = {
    url: `${context.state.api}/auth/login`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      username: username,
      password: password
    }
  }
  context.commit('setAuthPending', true);
  axios(options)
  .then((response) => {
    console.log(response);
    context.commit('setAuthStatus', true);
    context.commit('setToken', response.data.token);
  })
  .catch((error) => {
    console.log(error);
    context.commit('setAuthStatus', false);
  })
  .finally(() => {
    context.commit('setAuthPending', false);
  })
},

logout

signupPost: (context, { username, password, email, name }) => {
  const options = {
    url: `${context.state.api}/auth/signup`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      username: username,
      password: password,
      email: email,
      name: name
    }
  }
  context.commit('setAuthPending', true);
  axios(options)
  .then((response) => {
    console.log(response);
    context.commit('setAuthStatus', true);
    context.commit('setToken', response.data.token);
  })
  .catch((error) => {
    console.log(error);
    context.commit('setToken', null);
    context.commit('setAuthStatus', true);
  })
  .finally(() => {
    context.commit('setAuthPending', false);
  })
},
feedGet: (context) => {
  const options = {
    url: `${context.state.api}/user/feed?p=${context.state.p}&n=${context.state.n}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${context.state.token}`
    }
  }
  context.commit('setFeedPending', true);
  axios(options)
  .then((response) => {
    console.log(response);
    context.commit('setFeedStatus', true);
    context.commit('addFeed')
    context.commit('adjustFeed', response.data.length);
  })
  .catch((error) => {
    console.log(error);
    context.commit('setFeedStatus', false);
  })
  .finally(() => {
    context.commit('setFeedPending', false);
  })
},
profileGet: (context) => {
  const options = {
    url: `${context.state.api}/user`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${context.state.token}`
    }
  }
  context.commit('setProfilePending', true);
  axios(options)
  .then((response) => {
    console.log(response);
    context.commit('setProfileStatus', true);
    context.commit('setProfile', response.data);
  })
  .catch((error) => {
    console.log(error);
    context.commit('setProfileStatus', false);
  })
  .finally(() => {
    context.commit('setProfilePending', false);
  })
},
profilePut: (context, { payload }) => {
  const options = {
    url: `${context.state.api}/user`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${context.state.token}`
    },
    data: {
      payload: payload
    }
  }
  context.commit('setProfilePending', true);
  axios(options)
  .then((response) => {
    console.log(response);
    context.commit('setProfileStatus', true);
  })
  .catch((error) => {
    console.log(error);
    context.commit('setProfileStatus', false);
  })
  .finally(() => {
    context.commit('setProfilePending', false);
  })
},
userGet: (context, { username }) => {
  if (this.state.users.some((user) => {
    return user.username === username;
  })) {
    return;
  }
  const options = {
    url: `${context.state.api}/user?username=${username}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${context.state.token}`
    }
  }
  context.commit('setUserPending', true);
  axios(options)
  .then((response) => {
    console.log(response);
    context.commit('setUserStatus', true);
    context.commit('addUser', response.data);
  })
  .catch((error) => {
    console.log(error);
    context.commit('setUserStatus', false);
  })
  .finally(() => {
    context.commit('setUserPending', false);
  })
},
followPut: (context, { username }) => {
  const options = {
    url: `${context.state.api}/user/follow?username=${username}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${context.state.token}`
    },
  }
  context.commit('setFollowPending', true);
  axios(options)
  .then((response) => {
    console.log(response);
    context.commit('setFollowStatus', true);
  })
  .catch((error) => {
    console.log(error);
    context.commit('setFollowStatus', false);
  })
  .finally(() => {
    context.commit('setFollowPending', false);
  })
},
unfollowPut: (context, { username }) => {
  const options = {
    url: `${context.state.api}/user/unfollow?username=${username}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${context.state.token}`
    },
  }
  context.commit('setFollowPending', true);
  axios(options)
  .then((response) => {
    console.log(response);
    context.commit('setFollowStatus', true);
  })
  .catch((error) => {
    console.log(error);
    context.commit('setFollowStatus', false);
  })
  .finally(() => {
    context.commit('setFollowPending', false);
  })
}
*/