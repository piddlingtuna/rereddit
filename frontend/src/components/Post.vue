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
            <a tag="router-link" @click="user">
              u/{{ post.meta.author }}
            </a>
            <br />
            <a tag="router-link" @click="sub">
              s/{{ post.meta.subseddit }}
            </a>
            <br />
            {{ post.meta.published }}
          </p>
        </div>
      </div>
      <div class="content">
        {{ post.text }}
        <br />

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
</template>

<script>
export default {
  name: 'post',
  props: {
    post: Object
  },
  methods: {
    user() {
      this.$router.push({ path: `/u/${this.$props.post.meta.author}` });
    },
    sub() {
      this.$router.push({ path: `/s/${this.$props.post.meta.subseddit}` });
    },
    comments() {
      this.$router.push({ path: `/p/${this.$props.post.id}` });
    }
  }
}
</script>
