<template>
  <div class="app-container">
    <div class="row">
      <div class="column">
        <infobox title="Projects" info="25"></infobox>
      </div>
      <div class="column">
        <infobox title="All Active Issues" info="120"></infobox>
      </div>
      <div class="column">
        <infobox title="My Active Issues" info="2"></infobox>
      </div>
      <div class="column">
        <infobox class="last-infobox" title="Bugs" info="12"></infobox>
      </div>
    </div>
  </div>
</template>

<script>
import infobox from "../components/InfoBox.vue";

export default {
  components: { infobox },

  created() {
    this.$store.commit('setSidebarTitle', 'Dashboard');
  },
};
</script>

<style lang="scss" scoped>
.row {
  display: table;
  width: 100%;
  table-layout: fixed;
}

.column {
  display: table-cell;
  width: 25%;
  float: left;
}
</style>

