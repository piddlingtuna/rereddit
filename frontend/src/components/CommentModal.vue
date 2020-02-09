<template>
  <form @submit.prevent>
    <div class="modal-card" style="width: 50rem">
      <header class="modal-card-head">
        <p class="modal-card-title">Comment on {{ post.title}}</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Comment">
          <b-input
            type="comment"
            v-model="comment"
            placeholder="comment"
            required>
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success"
          v-if="comment"
          @click="[commentPost(), $parent.close()]"
        >
          Comment
        </button>
        <button class="button is-warning" v-else>
          Comment
        </button>
        <button class="button is-danger" type="button"
          @click="$parent.close()"
        >
          Close
        </button>
      </footer>
    </div>
  </form>
</template>


<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
  name: 'commentModal',
  props: {
    post: Object
  },
  data() {
    return {
      comment: null,
      pending: null,
      status: null,
    }
  },
  computed: {
    ...mapGetters([
      'getToken',
      'getApi'
    ])
  },
  methods: {
    commentPost() {
      const options = {
        url: `${this.getApi}/post/comment?id=${this.post.id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${this.getToken}`
        },
        data: {
          comment: this.comment
        }
      }
      this.pending = true;
      axios(options)
      .then(() => {
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
  }
}
</script>