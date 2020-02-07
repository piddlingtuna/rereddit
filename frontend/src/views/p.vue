<template>
  <div>
    <div class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ post.meta }}
          </h1>
          <h2 class="subtitle is-6">
            <a v-if="getToken" tag="router-link" @click="author">
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
          </h2>
          <h2 class="is-6">
            {{ post.text }}
            <br />
            {{ pubDate(post.meta.published) }}
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
              <a v-if="token" tag="router-link" @click="commentAuthor(comment.author)">
                u/{{ comment.author }}
              </a>
              <a>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
export default {
  name: 'postPage',
  props: {
    id: String
  },
  computed: {
    ...mapGetters([
      'getToken',
      'getUser'
    ]),
    post() {
      return this.getPost(this.$props.id);
    }
  },
  methods: {
    ...mapActions([
      'userFeed'
    ]),
    author() {
      this.$router.push({ path: `/u/${this.post.meta.author}` });
    },
    sub() {
      this.$router.push({ path: `/s/${this.post.meta.subseddit}` });
    },
    commentAuthor(author) {
      this.$router.push({ path: `/u/${author}` });
    },
  }
}
</script>