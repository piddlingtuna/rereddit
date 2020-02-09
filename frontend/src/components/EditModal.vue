<template>
  <form @submit.prevent>
    <div class="modal-card" style="width: 50rem">
      <header class="modal-card-head">
        <p class="modal-card-title">Signup</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Title">
          <b-input
            type="text"
            v-model="title"
            placeholder="title"
            required>
          </b-input>
        </b-field>
        <b-field label="Text">
          <b-input
            type="text"
            v-model="text"
            placeholder="text"
            required
          >
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success"
          v-if="title && text"
          @click="[editPost(), $parent.close()]"
        >
          Edit
        </button>
        <button class="button is-warning" v-else>
          Edit
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
  name: 'postModal',
  props: {
    post: Object
  },
  data() {
    return {
      title: this.post.title,
      text: this.post.text,
      image: this.post.image,
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
    editPost() {
      const options = {
        url: `${this.getApi}/post?id=${this.post.id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${this.getToken}`
        },
        data: {
          title: this.title,
          text: this.text,
          // image: this.image
        }
      }
      this.pending = true;
      axios(options)
      .then((response) => {
        console.log(response);
        this.post.title = this.title;
        this.post.text = this.text;
        //this.post.image = this.image;
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