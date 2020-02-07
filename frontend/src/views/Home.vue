<template>
  <div>
    <div v-if="status">
      <div class="container">
        <div v-if="getToken">
          <Post
            v-for="post in this.feed"
            :key="post.id"
            :post="post"
          />
        </div>
        <div v-else>
          <Post
            v-for="post in this.public"
            :key="post.id"
            :post="post"
          />
        </div>
      </div>
    </div>
    <div v-else-if="pending">
      The page is loading.
    </div>
    <div v-else>
      An error has occurred.
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import axios from 'axios';
export default {
  name: 'home',
  data() {
    return {
      feed: [],
      public: [],
      pending: null,
      status: null,
      p: 0,
      n: 20
    }
  },
  computed: {
    ...mapGetters([
      'getToken',
      'getApi'
    ])
  },
  methods: {
    ...mapMutations([
      'setProfile'
    ]),
    getPublic() {
      const options = {
        url: `${this.getApi}/post/public`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      this.pending = true;
      axios(options)
      .then((response) => {
        console.log(response);
        this.public = response.data.posts;
        this.status = true;
      })
      .catch((error) => {
        console.log(error);
        this.status = false;
      })
      .finally(() => {
        this.pending = false;
      })
    },
    getFeed() {
      const options = {
        url: `${this.getApi}/user/feed?p=${this.p}&n=${this.n}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${this.getToken}`
        }
      }
      this.pending = true;
      axios(options)
      .then((response) => {
        console.log(response);
        response.data.posts.forEach((post) => {
          this.feed.push(post);
        });
        this.p += response.data.posts.length
        this.status = true;
      })
      .catch((error) => {
        console.log(error);
        this.status = false;
      })
      .finally(() => {
        this.pending = false;
      })
    },
    getProfile() {
      const options = {
        url: `${this.getApi}/user`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${this.getToken}`
        }
      }
      this.pending = true;
      axios(options)
      .then((response) => {
        console.log(response);
        this.setProfile(response.data);
        this.status = true;
      })
      .catch((error) => {
        console.log(error);
        this.status = false;
      })
      .finally(() => {
        this.pending = false;
      })
    },
    handleScroll() {
      if(this.getToken && (window.innerHeight + window.scrollY >= document.body.offsetHeight)) {
        this.getFeed();
      }
    }
  },
  watch: {
    getToken(value) {
      if (value) {
        this.getFeed();
        this.getProfile();
      } else {
        this.getProfile();
      }
    }
  },
  created() {
    if (this.getToken) {
      this.getFeed();
    } else {
      this.getPublic();
    }
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>
