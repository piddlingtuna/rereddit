<template>
<form @submit.prevent>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Signup</p>
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
        <b-field label="Email">
          <b-input
            type="email"
            v-model="email"
            placeholder="email"
            required
          >
          </b-input>
        </b-field>
        <b-field label="Name">
          <b-input
            type="text"
            v-model="name"
            placeholder="name"
            required
          >
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success"
          v-if="username && password && email && name"
          @click="[auth_signup({ username: username, password: password, email: email, name: name }), $parent.close()]"
        >
          Signup
        </button>
        <button class="button is-warning" v-else>
          Signup
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
  name: 'signupModal',
  data() {
    return {
      username: '',
      password: '',
      email: '',
      name: ''
    }
  },
  methods: {
    ...mapActions([
      'auth_signup'
    ]),
  }
}
</script>