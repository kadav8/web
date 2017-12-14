<template>
  <div class="app-container">
    <progressbar v-show="hiddenList"></progressbar>
    <orderlist
        :datas="datas">
    </orderlist>
  </div>
</template>

<script>
import http from "../http.js";
import config from "../config.js";
import progressbar from "../components/ProgressBar.vue";
import orderlist from "../components/OrderList.vue";

export default {
  components: { progressbar, orderlist },

  data() {
    return {
      datas: [1,2],
      hiddenList: true,
    };
  },

  created() {
    this.fetch();
  },

  methods: {
    fetch() {
      this.hiddenList = false;
      http.get(config.getAllClaimsUrl).then(({ data }) => {
        this.datas = data.items;
        this.hiddenList = false;
      });
    }
  }
};
</script>

<style>
</style>
