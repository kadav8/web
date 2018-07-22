<template>
  <div class="i-container">
    <apptable 
      v-show="!hiddenTable" 
      :headers="headers" 
      :datas="datas" 
      :defaultSortKey="defaultSortKey" 
      :defaultPageSize="50"
      :selectable="false"
      :clickableCells="false"
      @onRowClick="rowClick"
      @onAddClick="addClick">
      </apptable>

      <form_modal 
        v-show="show_modal"
        :fields="formfields"
        :formdata="formdata"
        :isNew="isnew"
        @onSubmitClick="submitClick"
        @onCancelClick="show_modal=false"
        @onDeleteClick="deleteClick">
        </form_modal>
  </div>
</template>

<script>
import config from "../config.js";
import http from "../http.js";
import apptable from "../components/table/Table.vue";
import form_modal from "../components/FormModal.vue";

export default {
  components: { apptable, form_modal },

  data() {
    return {
      headers: [
        { title: "Id", key: "documentId" },
        { title: "Title", key: "title" },
        { title: "Version", key: "version" },
        { title: "CreationDate", key: "creationDate", date: "true" },
        { title: "LastModificationDate", key: "lastModificationDate", date: "true"},
      ],
      datas: [],
      formfields: [
        { title: "Id", key: "documentId", type: "text", disabled: "true" },
        { title: "Title", key: "title", type: "text" },
        //{ title: "Version", key: "version", type: "text" },
        //{ title: "CreationDate", key: "creationDate", type: "text" },
        //{ title: "LastModificationDate", key: "lastModificationDate", type: "text" },
      ],
      formdata: {},
      defaultSortKey: "documentId",
      hiddenTable: true,
      show_modal: false,
      isnew: false,
    };
  },

  created() {
    http.get(config.getSqlDocument).then(({ data }) => {
        this.datas = data;
        this.hiddenTable = false;
    });
  },

  methods: {
    rowClick(row, selectedRows) {
      this.isnew = false;
      this.formdata = JSON.parse(JSON.stringify(row));
      this.show_modal = true;
    },
    addClick() {
      this.isnew = true;
      this.formdata = {};
      this.show_modal = true;
    },
    deleteClick(id) {
      this.show_modal = false;
      http.get(config.deleteSqlDocument + id).then(({ data }) => {
        // TODO
        http.get(config.getSqlDocument).then(({ data }) => {
          this.datas = data;
        });
      });
    },
    submitClick() {
      this.show_modal = false;
      if(this.isnew) {
        http.post(config.saveSqlDocument, this.formdata).then(({ data }) => {
          this.datas.push(data);
        });
      } else {
        http.post(config.updateSqlDocument, this.formdata).then(({ data }) => {
          // TODO
          http.get(config.getSqlDocument).then(({ data }) => {
            this.datas = data;
          });
        });
      }
      this.formdata = {};
    },
  }
};
</script>