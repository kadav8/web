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
        { title: "Name", key: "name", width: "200px" },
        { title: "Manufacturer", key: "manufacturer", width: "200px" },
        { title: "Price", key: "price", width: "15%" },
        { title: "Stock", key: "stock", width: "15%" },
        { title: "Status", key: "status" },
        { title: "Adding date", key: "addDate" }
      ],
      datas: [],
      formfields: [
        { title: "Id", key: "id", type: "text", validate: "required, numeric" },
        { title: "Name", key: "name", type: "text", validate: "required, min(5)" },
        { title: "Manufacturer", key: "manufacturer", type: "text", validate: "required, max(10)" },
        { title: "Price", key: "price", type: "text" },
        { title: "Stock", key: "stock", type: "text" },
        { title: "Status", key: "status", type: "text" },
        { title: "Adding date", key: "addDate", type: "text" }
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
      http.get(config.getAllProductsUrl).then(({ data }) => {
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
