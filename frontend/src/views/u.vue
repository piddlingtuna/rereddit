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
    <Post class="container"
      v-for="post in userContent.posts"
      :key="post"
      :post="postContent(post)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
export default {
  name: 'userPage',
  props: {
    username: String,
  },
  computed: {
    ...mapGetters([
        'getUser',
        'getPost',
        'getUsers'
    ]),
    userContent() {
      this.user(this.$props.username);
      console.log(this.getUsers);
      console.log(this.$props.username);
      console.log(this.getUser(this.$props.username))
      return this.getUser(this.$props.username);
    }
  },
  methods: {
    ...mapActions([
      'user'
    ]),
    postContent(id) {
      return this.getPost(id);
    }
  }
}
</script>