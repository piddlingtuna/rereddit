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
          <div class="subtitle is-6">
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
            <br />
            {{ pubDate(post.meta.published) }}
            <br />
            <strong>{{ post.meta.upvotes.length }}</strong> upvotes
          </div>
        </div>
      </div>
      <div class="content">
        {{ post.text }}
        <br />
        <div v-if="getToken">
          <a
            v-if="!(getProfile.id in post.meta.upvotes)"
            @click="upvote"
          >
            upvote
          </a>
          <a
            v-else
            @click="downvote"
          >
            downvote
          </a>
          |
          <a
            tag="router-link"
          >
            comment
          </a>
          |
          <a
            tag="router-link"
            @click="comments"
          >
            show comments
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
  name: 'post',
  props: {
    post: Object
  },
  data() {
    return {
      pending: null,
      status: null
    }
  },
  computed: {
    ...mapGetters([
      'getToken',
      'getApi',
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
    },
    upvote() {
      const options = {
        url: `${this.getApi}/post/vote?id=${this.post.id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${this.getToken}`
        }
      }
      this.pending = true;
      axios(options)
      .then(() => {
        this.post.meta.upvotes.push(this.getProfile.id);
        this.status = true;
        console.log(this.post.meta.upvotes)
      })
      .catch((error) => {
        console.log(error);
        this.status = false;
      })
      .finally(() => {
        this.pending = false;
      })
    },
    downvote() {
      const options = {
        url: `${this.getApi}/post/vote?id=${this.post.id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${this.getToken}`
        }
      }
      this.pending = true;
      axios(options)
      .then(() => {
        this.post.meta.upvotes.splice(this.post.meta.upvotes.indexOf(this.getProfile.id), 1);
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
}
</script>
