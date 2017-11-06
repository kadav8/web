<template>
  <div class="app-header">
    <div class="app-header-element">
      <button class="hamburger-button" @click="changeSidebarVisibility">☰</button>
    </div>
    <div class="app-header-element">
      <b>{{appname}}</b>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      appname: config.appName
    };
  },

  methods: {
    ...mapMutations(["changeSidebarVisibility"])
  }
};
</script>

<style lang="scss" scoped>
.app-header-element {
  padding: 1em;
  position: relative;
  float: left;
  top: 50%;
  transform: translateY(-50%);
}

.hamburger-button {
  margin: 0px;
  padding: 0px;
  font-size: 16px;
  outline: 0px;
  &:hover {
    color: white;
  }
}
</style>
