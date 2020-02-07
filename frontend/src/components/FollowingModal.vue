<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Following</p>
    </header>
    <section class="modal-card-body">
      <div
        v-for="user in following"
        :key="user.id"
      >
        {{ user.username }}
        <br />
      </div>
      </section>
    <footer class="modal-card-foot">
      <button class="button" type="button"
        @click="$parent.close()"
      >
        Close
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'followingModal',
  props: {
    following: Array
  }
}
</script>