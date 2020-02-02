<template>
  <div class="about">
    <Info
      title="About"
      subtitle="Rereddit"
      :sections="getAbout"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'navbar',
  computed: {
      ...mapGetters([
          'getAbout'
      ])
  }
}
</script>