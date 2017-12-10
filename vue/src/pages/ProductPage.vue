<template>
  <div class="app-container">
    <progressbar v-show="hiddenTable"></progressbar>
    <apptable v-show="!hiddenTable" :headers="headers" :datas="datas" :defaultSortKey="defaultSortKey" :defaultPageSize="50" @onRowClick="rowClick"></apptable>
  </div>
</template>

<script>
import http from "../http.js";
import config from "../config.js";
import progressbar from "../components/ProgressBar.vue";
import apptable from "../components/Table.vue";
import { mapState, mapMutations } from "vuex";

export default {
  components: { progressbar, apptable },

  data() {
    return {
      headers: [
        { title: "Id", key: "id", width: "50px" },
        { title: "Name", key: "name", width: "200px" },
        { title: "Manufacturer", key: "manufacturer", width: "200px" },
        { title: "Price", key: "price", width: "15%" },
        { title: "Stock", key: "stock", width: "15%" },
        { title: "Status", key: "status" },
        { title: "Adding date", key: "addDate" }
      ],
      datas: [],
      defaultSortKey: "id",
      hiddenTable: true,
      showModal: false
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
    },
    rowClick(row) {
      console.log(row);
    }
  }
};
</script>

<style>
</style>
