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
      @onRowClick="rowClick"
      @onEditClick="editClick"
      @onDeleteClick="deleteClick"
      @onAddClick="addClick">
      </apptable>

    <form_modal 
      v-show="show_modal"
      :fields="formfields"
      :formdata="formdata"
      @onSubmitClick="submitClick"
      @onCancelClick="show_modal=false">
      </form_modal>
  </div>
</template>

<script>
import http from "../http.js";
import config from "../config.js";
import progressbar from "../components/ProgressBar.vue";
import apptable from "../components/table/Table.vue";
import form_modal from "../components/FormModal.vue";

export default {
  components: { progressbar, apptable, form_modal },

  data() {
    return {
      headers: [
        { title: "Id", key: "id", width: "50px" },
        { title: "Customer Name", key: "customerName" },
        { title: "Status", key: "status" },
        { title: "Total", key: "total", bclasses: 'total', fix: '$' },
        { title: "Order Date", key: "orderDate" },
        { title: "Payment", key: "payment" },
        { title: "Delivery", key: "delivery" },
        { title: "Email", key: "email" }
      ],
      datas: [],
      formfields: [
        { title: "Id", key: "id", type: "text", validate: "required, numeric" },
        { title: "Customer Name", key: "customerName", type: "text", validate: "required, min(5)" },
        { title: "Status", key: "status", type: "text", validate: "required, max(10)" },
        { title: "Total", key: "total", type: "text" },
        { title: "Order Date", key: "orderDate", type: "text" },
        { title: "Payment", key: "payment", type: "text" },
        { title: "Delivery", key: "delivery", type: "text" },
        { title: "Email", key: "email", type: "text", validate: "required, email" }
      ],
      formdata: {},
      defaultSortKey: "id",
      hiddenTable: true,
      show_modal: false,
      selectedRow: null
    };
  },

  created() {
    this.fetch();
  },

  methods: {
    fetch() {
      http.get(config.getAllClaimsUrl).then(({ data }) => {
        this.datas = data.items;
        this.hiddenTable = false;
      });
    },
    rowClick(row, selectedRows) {
      if(selectedRows.length === 0) {
        this.selectedRow = null;
      } else {
        this.selectedRow = selectedRows[selectedRows.length-1];
      }
    },
    editClick() {
      this.formdata = JSON.parse(JSON.stringify(this.selectedRow));
      this.show_modal = true;
    },
    deleteClick() {
    },
    addClick() {
      this.formdata = {};
      this.show_modal = true;
    },
    submitClick() {
      this.show_modal = false;
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
