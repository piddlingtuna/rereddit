<template>
  <div>
    <div class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ user.username }}
          </h1>
          <h2 class="is-6">
            email: {{ user.email }}
            <br />
            name: {{ user.name }}
            <br />
            #followers: {{ user.following.length }}
            <br />
            #followed: {{ user.followed_num }}
          </h2>
        </div>
      </div>
    </div>
    <Post class="container"
      v-for="post in user.posts"
      :key="post"
      :post="postContent(post)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'userPage',
  props: {
    username: String,
  },
  computed: {
    ...mapGetters([
        'getUser',
        'getPost'
    ]),
    user() {
      return this.getUser(this.$props.username);
    }
  },
  methods: {
    postContent(id) {
      return this.getPost(id);
    }
  }
}
</script>