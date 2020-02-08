<template>
  <form @submit.prevent>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Username">
          <b-input
            type="text"
            v-model="username"
            placeholder="username"
            required>
          </b-input>
        </b-field>
        <b-field label="Password">
          <b-input
            type="password"
            v-model="password"
            password-reveal
            placeholder="password"
            required
          >
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success"
          v-if="username && password"
          @click="[login(), $parent.close()]"
        >
          Login
        </button>
        <button class="button is-warning" v-else>
          Login
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
  name: 'loginModal',
  data() {
    return {
      username: '',
      password: '',
      pending: null,
      status: null
    }
  },
  computed: {
    ...mapGetters([
      'getApi'
    ])
  },
  methods: {
    ...mapMutations([
      'setToken'
    ]),
    login() {
      const options = {
        url: `${this.getApi}/auth/login`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username: this.username,
          password: this.password
        }
      }
      this.pending = true;
      axios(options)
      .then((response) => {
        this.setToken(response.data.token);
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