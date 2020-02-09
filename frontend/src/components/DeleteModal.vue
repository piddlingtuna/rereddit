<template>
  <form>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Post</p>
      </header>
      <footer class="modal-card-foot">
        <button class="button is-danger"
          @click="[deletePost(), $parent.close()]"
        >
          Delete
        </button>
        <button class="button" type="button"
          @click="$parent.close()"
        >
          Close
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
  name: 'deleteModal',
  props: {
    id: Number
  },
  data() {
    return {
      pending: null,
      status: null
    }
  },
  computed: {
    ...mapGetters([
      'getToken',
      'getApi'
    ])
  },
  methods: {
    deletePost() {
      const options = {
        url: `${this.getApi}/post?id=${this.id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${this.getToken}`
        }
      }
      this.pending = true;
      axios(options)
      .then((response) => {
        console.log(response);
        this.status = true;
        this.$router.push({ path: '/'});
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