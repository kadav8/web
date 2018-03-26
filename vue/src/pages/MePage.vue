<template>
  <div class="app-container">
    <p>Me</p>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('setSidebarTitle', 'Me');
  },
};
</script>