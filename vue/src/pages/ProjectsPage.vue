<template>
  <div class="app-container">
    <progressbar v-show="hiddenTable"></progressbar>

    <apptable 
      v-show="!hiddenTable" 
      :headers="headers" 
      :datas="datas" 
      :filters="filters"
      :defaultSortKey="defaultSortKey" 
      :defaultPageSize="50"
      :selectable="true"
      :deletable="true"
      :editable="true"
      :coloredStatus="true"
      :clickableCells="true"
      @onRowClick="rowClick"
      @onOpenClick="openClick"
      @onEditClick="editClick"
      @onDeleteClick="deleteClick"
      @onAddClick="addClick"
      @onCellClick="cellClick">
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
import { mapState } from "vuex";
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
        { title: "Id", key: "id", width: "50px", prefix: '#' },
        { title: "Name", key: "name", bclasses: 'name-column' },
        { title: "Lead", key: "lead", bclasses: 'bold' },
        { title: "Type", key: "type" },
        { title: "Client", key: "client" },
        { title: "Status", key: "status" },
        { title: "Adding date", key: "addDate" }
      ],
      datas: [],
      filters: [
        { title: "Status", key: "status", selects: ["Active", "Inactive"] }
      ],
      formfields: [
        { title: "Id", key: "id", type: "text", validate: "required, numeric" },
        { title: "Name", key: "name", type: "text", validate: "required, min(3)" },
        { title: "Lead", key: "lead", type: "text" },
        { title: "Type", key: "type", type: "text", validate: "required, max(25)" },
        { title: "Client", key: "client", type: "text" },
        { title: "Status", key: "status", type: "select", selects: ["Active", "Inactive"], validate: "required" },
        { title: "Adding date", key: "addDate", type: "text" }
      ],
      formdata: {},
      defaultSortKey: "id",
      hiddenTable: true,
      show_modal: false,
    };
  },

  created() {
    this.fetch();
  },

  computed: {
    ...mapState(["isSidebarVisible", "lastOpenedProjects"])
  },

  methods: {
    fetch() {
      http.get(config.getAllProjectsUrl).then(({ data }) => {
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
    openClick(selectedRows) {
      for (var i = 0; i < selectedRows.length; i++) {
        let row = selectedRows[i];
        this.$store.commit('pushLastOpenedProjects', {id:row.id, name:row.name});
      }
    },
    deleteClick() {
      this.$alertError('A törlés még nem működik!')
    },
    addClick() {
      this.formdata = {};
      this.show_modal = true;
    },
    submitClick() {
      this.show_modal = false;
      this.$alertSuccess('Sikeres elem felvétel!')
    },
    cellClick(key,value,row) {
      if(key==='name') {
        this.$store.commit('pushLastOpenedProjects', {id:row.id, name:row.name});
        this.$router.push({ name: 'toproject', params: { id: row.id }});
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";

.bold {
    font-weight: 500;
}
.name-column {
    font-weight: 500;
    color: $blue;
    &:hover {
    text-decoration: underline;
    }
}
</style>
