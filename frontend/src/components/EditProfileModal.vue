<template>
  <form @submit.prevent>
    <div class="modal-card" style="width: 50rem">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Profile</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Email">
          <b-input
            type="email"
            v-model="email"
          >
          </b-input>
        </b-field>
        <b-field label="Name">
          <b-input
            type="text"
            v-model="name"
          >
          </b-input>
        </b-field>
        <b-field label="Password">
          <b-input
            type="password"
            v-model="password"
            placeholder="password"
            password-reveal
          >
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success"
          v-if="email || name || password"
          @click="[edit(), $parent.close()]"
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
import { mapGetters, mapMutations } from 'vuex';
import axios from 'axios';
export default {
  name: 'editProfileModal',
  props: {
    user: Object
  },
  data() {
    return {
      email: this.user.email,
      name: this.user.name,
      password: '',
      pending: null,
      status: null,
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
    ...mapMutations([
      'setEmail',
      'setName'
    ]),
    edit() {
      const payload = {}
      if (this.email) {
        payload.email = this.email;
      }
      if (this.name) {
        payload.name = this.name;
      }
      if (this.password) {
        payload.password = this.password;
      }
      const options = {
        url: `${this.getApi}/user`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${this.getToken}`
        },
        data: payload
      }
      this.pending = true;
      axios(options)
      .then(() => {
        if (this.email) {
          this.user.email = this.email;
          this.setEmail(this.email);
        }
        if (this.name) {
          this.user.name = this.name;
          this.setName(this.name);
        }
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