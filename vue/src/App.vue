<template>
  <div class="app-main">
    <headbar></headbar>
    <div class="app-content">
      <sidebar></sidebar>
      <div ref="page" class="app-page" :class="{'fullpage': !isSidebarVisible}">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import headbar from "./components/Headbar.vue";
import sidebar from "./components/Sidebar.vue";

export default {
  components: { headbar, sidebar },

  data() {
    return {
      pagewidth: 0
    };
  },

  computed: {
    ...mapState([
      "isSidebarVisible" // map this.isSidebarVisible to store.state.isSidebarVisible
    ])
  }
};
</script>

<style lang="scss">
@import "./styles/basics.scss";
@import "./styles/layout.scss";

.fullpage {
  margin-left: 0;
}

@media screen and (max-width: 800px) {
  .app-sidebar {
    width: 0;
  }
  .app-page {
    margin-left: 0;
  }
}
</style>
