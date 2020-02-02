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
export default {
  name: 'home',
  computed: {
      ...mapGetters([
          'getApi',
          'getPosts'
      ])
  }
}
</script>
