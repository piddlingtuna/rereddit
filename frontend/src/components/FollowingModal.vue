<template>
  <div class="modal-card" style="width: 30rem">
    <header class="modal-card-head">
      <p class="modal-card-title">Following</p>
    </header>
    <section class="modal-card-body">
      <div
        v-for="user in following"
        :key="user.id"
      >
        <div class="level">
          <div class="level-left">
            <h1 class="level-item title is-4">
              {{ user.username }}
            </h1>
          </div>
          <div class="level-right">
            <div class="level-item button is-info"
              v-if="(user.username != getProfile.username) && !getProfile.following.includes(user.id)"
              @click="follow(user)"
            >
              Follow
            </div>
            <div class="level-item button is-info"
              v-if="(user.username != getProfile.username) && getProfile.following.includes(user.id)"
              @click="unfollow(user)"
            >
              Unfollow
            </div>
          </div>
        </div>
          <h2 class="is-6">
          name: {{ user.name }}
          <br />
          #followers: {{ user.following.length }}
          <br />
          #following: {{ user.followed_num }}
        </h2>
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
import { mapGetters, mapMutations } from 'vuex';
import axios from 'axios';
export default {
  name: 'followingModal',
  props: {
    following: Array
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
      'getApi',
      'getProfile'
    ])
  },
  methods: {
    ...mapMutations([
      'addFollow',
      'removeFollow'
    ]),
    follow(user) {
      const options = {
        url: `${this.getApi}/user/follow?username=${user.username}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${this.getToken}`
        },
      }
      this.pending = true;
      axios(options)
      .then(() => {
        this.status = true;
        this.addFollow(user.id);
      })
      .catch((error) => {
        console.log(error);
        this.status = false;
      })
      .finally(() => {
        this.pending = false;
      })
    },
    unfollow(user) {
       const options = {
        url: `${this.getApi}/user/unfollow?username=${user.username}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${this.getToken}`
        },
      }
      this.pending = true;
      axios(options)
      .then(() => {
        this.status = true;
        this.removeFollow(user.id);
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

<style scoped>
.modal-card {
  width: 50rem;
}
</style>