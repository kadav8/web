<template>
  <div class="i-simple-container">
    <headerbar></headerbar>
    <div class="i-main-content">
      <router-view></router-view>
    </div>
    <notifications_area></notifications_area>
  </div>
</template>

<script>
import headerbar from "./components/Headerbar.vue";
import notifications_area from "./components/NotificationsArea.vue";

export default {
  components: { headerbar, notifications_area },
};
</script>

<style lang="scss">
@import "./styles/basics.scss";
@import "./styles/layout.scss";
</style>
