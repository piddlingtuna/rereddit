<template>
  <div>
    <div v-if="status">
      <div class="hero is-info">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              {{ user.username }}      
              <div class="button is-white"
                v-if="user.username != getProfile.username"
              >
                Follow
              </div>
              <div class="button is-white"
                @click="followingModal = true"
              >
                See Following
              </div>
            </h1>
            <h2 class="is-6">
              email: {{ user.email }}
              <br />
              name: {{ user.name }}
              <br />
              #posts: {{ user.posts.length }}
              <br />
              #followers: {{ user.following.length }}
              <br />
              #following: {{ user.followed_num }}
            </h2>

          </div>
        </div>
      </div>
      <div v-if="posts">
        <Post
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
      </div>
      <div v-else>
        Waiting for posts.
      </div>
    </div>
    <div v-else-if="pending">
      The page is loading.
    </div>
    <div v-else>
      An error has occurred.
    </div>
    <b-modal
      :active.sync="followingModal"
      has-modal-card
      trap-focus
    >
      <FollowingModal />
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
  name: 'userPage',
  props: {
    username: String
  },
  data() {
    return {
      user: null,
      posts: [],
      following: [],
      pending: null,
      status: null,
      followingModal: false
    }
  },
  computed: {
    ...mapGetters([
        'getToken',
        'getProfile',
        'getApi'
    ])
  },
  methods: {
    getUser() {
      const options = {
        url: `${this.getApi}/user?username=${this.username}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${this.getToken}`
        }
      }
      this.pending = true;
      axios(options)
      .then((response) => {
        console.log(response);
        this.user = response.data;
        this.user.posts.forEach((post) => {
          this.getPost(post);
        });
        this.user.following.forEach((user) => {
          this.getFollowing(user);
        });
        this.status = true;
      })
      .catch((error) => {
        console.log(error);
        this.status = false;
      })
      .finally(() => {
        this.pending = false;
      })
    },
    getPost(id) {
      const options = {
        url: `${this.getApi}/post?id=${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${this.getToken}`
        }
      }
      this.pending = true;
      axios(options)
      .then((response) => {
        console.log(response);
        this.posts.push(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.status = false;
      })
    },
    getFollowing(id) {
      const options = {
        url: `${this.getApi}/user?id=${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${this.getToken}`
        }
      }
      this.pending = true;
      axios(options)
      .then((response) => {
        console.log(response);
        this.following.push(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.status = false;
      })
    }
  },
  created() {
    this.getUser()
  }
}
</script>

<style scoped>
.button {
  margin-left: 1rem;
}
</style>