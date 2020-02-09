<template>
  <div>
    <div>
      <div class="hero is-info">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              {{ sub }}
            </h1>
          </div>
        </div>
      </div>
    </div>
    <div>
      This section is incomplete.
    </div>
  </div>
</template>

<script>
export default {
  name: 'subPage',
  props: {
    sub: String
  }
}
</script>
