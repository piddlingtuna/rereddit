<template>
  <div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'userPage',
  props: {
    username: String,
  },
  computed: {
    ...mapGetters([
        'getUser'
    ]),
    user() {
      return this.getUser(this.$props.username);
    }
  }
}
</script>