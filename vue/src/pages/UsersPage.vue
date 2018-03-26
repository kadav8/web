<template>
  <div class="app-container">
    <p>Users</p>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('setSidebarTitle', 'Users');
  },
};
</script>