<template>
  <div>
    <div class="hero is-white">
      <div class="hero-body">
        <div class="container">
          <h1 class="subtitle">
            {{ id }}
            {{ post.title }}
          </h1>
          <h2 class="is-6">
            {{ post.text }}
          </h2>
        </div>
      </div>
    </div>
    <div class="container"
      v-for="comment in post.comments"
      :key="comment.id"
    >
      <div class="card">
        <div class="card-content">
            <p class="title is-6">
              {{ comment.author }}
            </p>
          <div class="content">
            {{ comment.comment }}
            <br />
            {{ comment.published }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'postPage',
  props: {
    id: String
  },
  computed: {
    ...mapGetters([
        'getPost'
    ]),
    post() {
      return this.getPost(this.$props.id);
    }
  }
}
</script>