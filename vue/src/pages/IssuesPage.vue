<template>
  <div class="app-container">
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
import http from "../http.js";
import config from "../config.js";
import apptable from "../components/table/Table.vue";
import form_modal from "../components/FormModal.vue";

export default {
  components: { apptable, form_modal },

  data() {
    return {
      headers: [
        { title: "Id", key: "id", width: "50px" },
        { title: "Name", key: "name", bclasses: 'name-column'},
        { title: "Summary", key: "summary", width: "30%", bclasses: 'bold' },
        { title: "Priority", key: "priority" },
        { title: "Type", key: "type" },
        { title: "Status", key: "status" },
        { title: "Project", key: "project" },
        { title: "Adding Date", key: "addDate" }
      ],
      datas: [],
      filters: [
        { title: "Priority", key: "priority", selects: ["Low", "Medium", "High"] },
        { title: "Type", key: "type", selects: ["Bug", "New Feature"] },
        { title: "Status", key: "status", selects: ["Todo", "In Progress", "Under Review", "Done", "Cancelled"] },
      ],
      formfields: [
        { title: "Id", key: "id", type: "text", validate: "required" },
        { title: "Name", key: "name", type: "text", validate: "required, min(3)" },
        { title: "Summary", key: "summary", type: "text", validate: "required, max(100)" },
        { title: "Priority", key: "priority", type: "text" },
        { title: "Type", key: "type", type: "text" },
        { title: "Status", key: "status", type: "text" },
        { title: "Project", key: "project", type: "text" },
        { title: "Adding Date", key: "addDate", type: "text"}
      ],
      formdata: {},
      defaultSortKey: "id",
      hiddenTable: true,
      show_modal: false,
      selectedRow: null
    };
  },

  created() {
    this.$store.commit('setSidebarTitle', 'Issues');
    this.fetch();
  },

  methods: {
    fetch() {
      http.get(config.getAllIssuesUrl).then(({ data }) => {
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
        this.$store.commit('pushLastOpenedIssues', {id:row.id, name:row.name});
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
    },
    cellClick(key,value,row) {
      if(key==='name') {
        this.$store.commit('pushLastOpenedIssues', {id:row.id, name:row.name});
        this.$router.push({ name: 'toissue', params: { id: row.id }});
      }
    }
  }
};
</script>

<style lang="scss">
@import "../styles/colors.scss";
.name-column {
    font-weight: 500;
    color: $blue;
    &:hover {
    text-decoration: underline;
    }
}
.bold {
    font-weight: 500;
}
</style>
