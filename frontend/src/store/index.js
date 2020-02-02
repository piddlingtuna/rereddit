import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: '127.0.0.1:5000',
    id: 1,
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
    users: [
      {
        "username": "baz",
        "name": "Barry",
        "id"  : 1,
        "posts": [1]
      },
      {
        "username": "a_cop",
        "name": "Not a cop",
        "id"  : 2,
        "posts": [2]
      },
      {
        "username": "bad_boy",
        "name": "Good Boy",
        "id"  : 3,
        "posts": [3]
      }
    ],
    posts: [
      {
        "id": 141,
        "text": "Philosophy is a battle against the bewitchment of our intelligence by means of language",
        "title": "Philosophy is",
        "meta": {
            "author": "Sandra",
            "subseddit": "shower-thoughts",
            "published": "1551568707",
            "upvotes": [
                3,
                106,
                173,
                142,
                48,
                176,
                18,
                20,
                85,
                149,
                151,
                181,
                87,
                26,
                117,
                124,
                157,
                190
            ]
        },
        "thumbnail": null,
        "image": null,
        "comments": [
            {
                "author": "Theresa",
                "published": "1557845057",
                "comment": "I love this shot!"
            },
            {
                "author": "Jose",
                "published": "1558163297",
                "comment": "are you kidding me? unfollowed"
            },
            {
                "author": "Teresa",
                "published": "1556249333",
                "comment": "i agree! why are more people not saying this"
            }
        ]
      }, {
        "id": 142,
        "text": "Philosophy is nothing compared to Philosophy",
        "title": "Number 2",
        "meta": {
            "author": "Sandra",
            "subseddit": "shower-thoughts",
            "published": "1551568707",
            "upvotes": [
                3,
                106,
                173,
                142,
                48,
                176,
                18,
                20,
                85,
                149,
                151,
                181,
                87,
                26,
                117,
                124,
                157,
                190
            ]
        },
        "thumbnail": null,
        "image": null,
        "comments": [
            {
                "author": "Theresa",
                "published": "1557845057",
                "comment": "I love this shot!"
            },
            {
                "author": "Jose",
                "published": "1558163297",
                "comment": "are you kidding me? unfollowed"
            },
            {
                "author": "Teresa",
                "published": "1556249333",
                "comment": "i agree! why are more people not saying this"
            }
        ]
      }
    ]
  },
  getters: {
    getApi: (state) => {
      return state.api;
    },
    getId: (state) => {
      return state.id;
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
  },
  actions: {
    
  },
  modules: {
  }
})
