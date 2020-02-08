<template>
  <div>
    <div v-if="status">
      <div class="hero is-info">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              {{ post.title }}
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
              <br />
              {{ pubDate(post.meta.published) }}
              <br />
              <strong>{{ post.meta.upvotes.length }}</strong> upvotes
            </h2>
            <h2 class="subtitle is-6">
              {{ post.text }}
              <br />
              <a
                v-if="!post.meta.upvotes.includes(getProfile.id)"
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
              >
                comment
              </a>
            </h2>
          </div>
        </div>
      </div>
      <Comment
        v-for="comment in post.comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>
    <div v-else-if="pending">
      The page is loading.
    </div>
    <div v-else>
      An error has occurred.
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
  name: 'postPage',
  props: {
    id: String
  },
  data() {
    return {
      post: null,
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
    getPost() {
      const options = {
        url: `${this.getApi}/post?id=${this.id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${this.getToken}`
        },
      }
      this.pending = true;
      axios(options)
      .then((response) => {
        this.post = response.data
        this.status = true;
      })
      .catch((error) => {
        console.log(error);
        this.status = false;
      })
      .finally(() => {
        this.pending = false;
      })
    },
    author() {
      this.$router.push({ path: `/u/${this.post.meta.author}` });
    },
    sub() {
      this.$router.push({ path: `/s/${this.post.meta.subseddit}` });
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
  created() {
    this.getPost();
  }
}
</script>