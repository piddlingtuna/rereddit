<template>
  <div class="container">
    <div class="card">
      <div class="card-content">
        <p class="title is-6">
          <a v-if="getToken" tag="router-link" @click="author(comment.author)">
            u/{{ comment.author }}
          </a>
          <a v-else>
            u/{{ comment.author }}
          </a>
        </p>
        <div class="content">
          {{ comment.comment }}
          <br />
          {{ pubDate(comment.published) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'comment',
  props: {
    comment: Object
  },
  computed: {
    ...mapGetters([
      'getToken'
    ])
  },
  methods: {
    author(author) {
      this.$router.push({ path: `/u/${author}` });
    }
  }
}
</script>