<template>
  <div class="app-container">
    <progressbar v-show="hiddenTable"></progressbar>
    <apptable 
      v-show="!hiddenTable" 
      :headers="headers" 
      :datas="datas" 
      :defaultSortKey="defaultSortKey" 
      :defaultPageSize="50"
      :selectable="true"
      :deletable="true"
      :editable="true"
      :coloredStatus="true"
      @onRowClick="rowClick">
      </apptable>
  </div>
</template>

<script>
import http from "../http.js";
import config from "../config.js";
import progressbar from "../components/ProgressBar.vue";
import apptable from "../components/table/Table.vue";

export default {
  components: { progressbar, apptable },

  data() {
    return {
      headers: [
        { title: "Id", key: "id", width: "50px" },
        { title: "Customer Name", key: "customerName" },
        { title: "Status", key: "status" },
        { title: "Total", key: "total", bclasses: 'total', fix: '$' },
        { title: "Order Date", key: "orderDate" },
        { title: "Payment", key: "payment" },
        { title: "Delivery", key: "delivery" }
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
      http.get(config.getAllCompletedUrl).then(({ data }) => {
        this.datas = data.items;
        this.hiddenTable = false;
      });
    }
  }
};
</script>

<style>
.total {
    color: green;
    font-weight: 700;
}
</style>
