<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-96x96">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ post.title }}</p>
          <p class="subtitle is-6">
            <a v-if="getToken && post.meta.author !== getProfile.username" tag="router-link" @click="author">
              u/{{ post.meta.author }}
            </a>
            <a v-else>
              u/{{ post.meta.author }}
            </a>
            |
            <a v-if="getToken" tag="router-link" @click="sub">
              s/{{ post.meta.subseddit }}
            </a>
            <a v-else>
              s/{{ post.meta.subseddit }}
            </a>
            <br />
            {{ pubDate(post.meta.published) }}
          </p>
        </div>
      </div>
      <div class="content">
        {{ post.text }}
        <br />
        <div v-if="getToken">
          <a tag="router-link" @click="comments">
            show comments
          </a>
          |
          <a tag="router-link">
            add comment
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'post',
  props: {
    post: Object
  },
  computed: {
    ...mapGetters([
      'getToken',
      'getProfile'
    ])
  },
  methods: {
    author() {
      this.$router.push({ path: `/u/${this.$props.post.meta.author}` });
    },
    sub() {
      this.$router.push({ path: `/s/${this.$props.post.meta.subseddit}` });
    },
    comments() {
      this.$router.push({ path: `/p/${this.$props.post.id}` });
    }
  },
}
</script>
