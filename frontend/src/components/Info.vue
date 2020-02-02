<template>
  <div class="info">
    <div class="hero is-white">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ title }}
          </h1>
          <h2 class="subtitle">
            {{ subtitle }}
          </h2>
        </div>
      </div>
    </div>
    <div class="container"
      v-for="section in sections"
      :key="section.title"
    >
      <div class="card">
        <div class="card-content">
            <p class="title is-4">
              {{ section.title }}
            </p>
          <div class="content">
            {{ section.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info',
  props: {
    title: String,
    subtitle: String,
    sections: Array
  }
}
</script>