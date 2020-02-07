<template>
  <div class="home">
    <div class="container">
      <Post
        v-for="post in getPosts"
        :post="post"
        :key="post.id"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
export default {
  name: 'home',
  computed: {
    ...mapGetters([
      'getPosts'
    ])
  },
  methods: {
    ...mapActions([
      'postPublic',
      'userFeed'
    ]),
    infinite() {
      console.log('hi');
      if(window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.userFeed();
      }
    }
  },
  mounted() {
    this.postPublic();
  },
  create() {
    window.addEventListener('scroll', this.infinite);
  },
  destroyed() {
    window.removeEventListener('scroll', this.infinite);
  }
}
</script>
