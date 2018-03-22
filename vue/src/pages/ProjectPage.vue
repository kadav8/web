<template>
  <div class="app-container">
    <p>Project: {{projectId}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectId: null
    };
  },

  mounted() {
    let path = window.location.hash.substring(1);
    let patharray = path.split("/");
    this.buildPage(patharray[patharray.length-1]);
  },

  beforeRouteUpdate (to, from, next) {
    this.buildPage(to.params.id);
    next();
  },

  methods: {
    buildPage(id) {
      this.projectId = id;
      
      
      
      // TODO : this.$store.commit('pushLastOpenedProjects', {id:row.id, name:row.name});

    }
  }
};
</script>