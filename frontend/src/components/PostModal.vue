<template>
  <form @submit.prevent>
    <div class="modal-card" style="width: 50rem">
      <header class="modal-card-head">
        <p class="modal-card-title">Post</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Title">
          <b-input
            type="text"
            v-model="title"
            required>
          </b-input>
        </b-field>
        <b-field label="Sub">
          <b-input
            type="text"
            v-model="sub"
            required
          >
          </b-input>
        </b-field>
        <b-field label="Text">
          <b-input
            type="text"
            v-model="text"
            required
          >
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success"
          v-if="title && sub && text"
          @click="[post(), $parent.close()]"
        >
          Post
        </button>
        <button class="button is-warning" v-else>
          Post
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
  data() {
    return {
      title: '',
      sub: '',
      text: '',
      image: '',
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
    post() {
      const options = {
        url: `${this.getApi}/post`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${this.getToken}`
        },
        data: {
          title: this.title,
          text: this.text,
          subseddit: this.sub,
          //image: this.image
        }
      }
      this.pending = true;
      axios(options)
      .then((response) => {
        console.log(response);
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