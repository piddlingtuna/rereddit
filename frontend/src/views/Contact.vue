<template>
  <div class="contact">
    <Info
      title="Contact"
      subtitle="Rereddit"
      :sections="getContact"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'navbar',
  computed: {
      ...mapGetters([
          'getContact'
      ])
  }
}
</script>