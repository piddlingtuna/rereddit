<template>
  <div>
    <b-navbar class="is-info">
      <template slot="brand">
        <b-navbar-item tag="router-link" to="/">
          <img
            src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          >
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item tag="div">
          <b-field type="is-info">
            <b-input placeholder="search" type="search" expanded></b-input>
            <p class="control">
              <b-button class="button is-info">Search</b-button>
            </p>
          </b-field>
        </b-navbar-item>
        <b-navbar-item tag="div">
          <div v-if="getToken" class="buttons">
            <a class="button is-white" @click="PostModal = true">
              Post
            </a>
            <a class="button is-white" @click="profile">
              Profile
            </a>
            <a class="button is-white" @click="LogoutModal = true">
              Log out
            </a>
          </div>
          <div v-else class="buttons">
            <a class="button is-white" @click="SignupModal = true">
              Sign up
            </a>
            <a class="button is-white" @click="LoginModal = true">
              Log in
            </a>
          </div>
        </b-navbar-item>
      </template>
      <template slot="end">
          <b-navbar-item tag="router-link" to="/about">
            About
          </b-navbar-item>
          <b-navbar-item tag="router-link" to="/contact">
            Contact
          </b-navbar-item>
      </template>
    </b-navbar>
    <b-modal
      :active.sync="SignupModal"
      has-modal-card
      trap-focus
    >
      <SignupModal />
    </b-modal>
    <b-modal
      :active.sync="LoginModal"
      has-modal-card
      trap-focus
    >
      <LoginModal />
    </b-modal>
    <b-modal
      :active.sync="PostModal"
      has-modal-card
      trap-focus
    >
      <PostModal />
    </b-modal>
    <b-modal
      :active.sync="LogoutModal"
      has-modal-card
      trap-focus
    >
      <LogoutModal />
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'navbar',
  data() {
    return {
      PostModal: false,
      SignupModal: false,
      LoginModal: false,
      LogoutModal: false
    }
  },
  computed: {
    ...mapGetters([
      'getToken',
      'getProfile'
    ])
  },
  methods: {
    profile() {
      if (this.$route.path !== `/u/${this.getProfile.username}`) {
        this.$router.push({ path: `/u/${this.getProfile.username}` });
      }
    }
  }
}
</script>
