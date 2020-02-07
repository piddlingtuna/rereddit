<template>
  <div>
    <div class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ userContent.username }}
          </h1>
          <h2 class="is-6">
            email: {{ userContent.email }}
            <br />
            name: {{ userContent.name }}
            <br />
            #followers: {{ userContent.following.length }}
            <br />
            #followed: {{ userContent.followed_num }}
          </h2>
        </div>
      </div>
    </div>
    <Post
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
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
      status: null
    }
  },
  computed: {
    ...mapGetters([
        'getToken',
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
        this.status = true;
      })
      .catch((error) => {
        console.log(error);
        this.status = false;
      })
      .finally(() => {
        this.pending = false;
      })
    }
  },
  created() {
    this.getUser();
    this.user.posts.forEach((post) => {
      this.getPost(post);
    });
    this.user.following.forEach((user) => {
      this.getFollowing(user);
    });
  }
}
</script>