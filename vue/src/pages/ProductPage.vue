<template>
  <div class="app-container">
    <progressbar v-show="hiddenTable"></progressbar>
    <apptable v-show="!hiddenTable" :headers="headers" :datas="datas" :defaultSortKey="defaultSortKey" :defaultPageSize="25"></apptable>
  </div>
</template>

<script>
import http from "../http.js";
import progressbar from "../components/ProgressBar.vue";
import apptable from "../components/Table.vue";
import config from "../config.js";

export default {
  components: { progressbar, apptable },

  data() {
    return {
      headers: [
        { title: "Id", key: "id" },
        { title: "Name", key: "name" },
        { title: "Manufacturer", key: "manufacturer" },
        { title: "Price", key: "price" },
        { title: "Stock", key: "stock" },
        { title: "Status", key: "status" },
        { title: "Adding date", key: "addDate" }
      ],
      datas: [],
      defaultSortKey: "id",
      hiddenTable: true
    };
  },

  created() {
    this.fetch();
  },

  methods: {
    fetch() {
      http.get(config.getAllProductsUrl).then(({ data }) => {
        this.datas = data.items;
        this.hiddenTable = false;
      });
    }
  }
};
</script>
