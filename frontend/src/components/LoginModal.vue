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
          @click="[auth_login({ username: username, password: password }), $parent.close()]"
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
import { mapActions } from 'vuex';
export default {
  name: 'loginModal',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions([
      'auth_login'
    ]),
  }
}
</script>