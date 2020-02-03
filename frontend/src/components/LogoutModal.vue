<template>
  <form>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Logout</p>
      </header>
      <footer class="modal-card-foot">
        <button class="button is-danger">Logout</button>
        <button class="button" type="button" @click="$parent.close()">Close</button>
      </footer>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'loginModal',
  methods: {
    ...mapActions([
        'auth_logout'
    ])
  }
}
</script>