<template>
  <div id="app">
    <Navbar />
    <router-view/>
    <div id="background" />
  </div>
</template>

<style>
* {
  overflow: hidden;
}
#app {
  background-color: hsl(141, 71%, 48%);
}
#background {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: hsl(141, 71%, 48%);
}
a {
  color: hsl(348, 100%, 61%);
}
.card {
  margin: 1rem;
}
</style>