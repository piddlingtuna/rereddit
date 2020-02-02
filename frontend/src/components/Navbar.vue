<template>
  <b-navbar transparent>
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
        <b-field type="is-success">
          <b-input placeholder="search" type="search" expanded></b-input>
          <p class="control">
            <b-button class="button is-success">Search</b-button>
          </p>
        </b-field>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div v-if="getId > 0" class="buttons">
          <a class="button is-warning">
            Profile
          </a>
          <a class="button is-danger">
            Log out
          </a>
        </div>
        <div v-else class="buttons">
          <a class="button is-warning">
            Sign up
          </a>
          <a class="button is-danger">
            Log in
          </a>
        </div>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-dropdown label="Info" hoverable>
        <b-navbar-item tag="router-link" to="/about" type="is-success">
          About
        </b-navbar-item>
        <b-navbar-item tag="router-link" to="/contact" type="is-success">
          Contact
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'navbar',
  computed: {
      ...mapGetters([
          'getId'
      ])
  }
}
</script>

<style scoped>
</style>