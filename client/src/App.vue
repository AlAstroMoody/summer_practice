<template>
  <div id="app">
    <Navbar />
    <transition name="views" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "app",
  components: { Navbar }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

.views-enter-active,
.views-leave-active {
  transition: opacity 0.2s;
}

.views-enter,
.views-leave-to {
  opacity: 0;
}
</style>
