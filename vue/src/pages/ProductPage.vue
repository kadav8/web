<template>
  <div class="maxheight">
    <progressbar v-show="hiddenTable"></progressbar>
    <apptable v-show="!hiddenTable" :headers="headers" :datas="datas" :defaultSortKey="defaultSortKey" :defaultPageSize="25"></apptable>
  </div>
</template>

<script>
import http from "../http.js";
import config from "../config.js";
import progressbar from "../components/ProgressBar.vue";
import apptable from "../components/Table.vue";

export default {
  components: { progressbar, apptable },

  data() {
    return {
      headers: [
        { title: "Id", key: "id", width: "80px" },
        { title: "Name", key: "name" },
        { title: "Manufacturer", key: "manufacturer", classes: "hide600" },
        { title: "Price", key: "price", width: "15%" },
        { title: "Stock", key: "stock", width: "10%", classes: "hide400" },
        { title: "Status", key: "status", width: "15%", classes: "hide400" },
        { title: "Adding date", key: "addDate", width: "15%", classes: "hide400" }
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
