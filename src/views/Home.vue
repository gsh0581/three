<template>
  <div class="home">
    <Scene />
  </div>
</template>

<script>
// @ is an alias to /src
import Scene from '@/components/Scene.vue'

export default {
  name: 'Home',
  components: {
    Scene,
  },
}
</script>
<style scoped>
.home {
  width: 100vw;
  height: 100vh;
}
</style>
