<template>
  <div>
    <div v-if="status">
      <div class="hero is-info">
        <div class="hero-body">
          <div class="container">
            <div class="media">
              <div class="media-left">
                <figure class="image is-96x96">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                </figure>
              </div>
              <div class="media-content">
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
              </div>
            </div>
            <h2 class="subtitle is-6">
              <br />
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
              <a @click="CommentModal = true">
                comment
              </a>
              <span v-if="post.meta.author === getProfile.username">
                |
                <a @click="EditModal = true">
                  edit
                </a>
                |
                <a @click="DeleteModal = true">
                  delete
                </a>
              </span>
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
    <b-modal
      :active.sync="CommentModal"
      has-modal-card
      trap-focus
    >
      <CommentModal
        :post="post"
      />
    </b-modal>
    <b-modal
      :active.sync="EditModal"
      has-modal-card
      trap-focus
    >
      <EditModal
        :post="post"
      />
    </b-modal>
    <b-modal
      :active.sync="DeleteModal"
      has-modal-card
      trap-focus
    >
      <DeleteModal
        :id="id"
      />
    </b-modal>
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
      CommentModal: false,
      EditModal: false,
      DeleteModal: false,
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