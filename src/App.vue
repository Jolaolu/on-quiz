<template>
  <div id="app"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  padding-top: 2.5rem;
  background: #f1f1f1;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin: 0;
}
* {
  box-sizing: border-box;
}
</style>
