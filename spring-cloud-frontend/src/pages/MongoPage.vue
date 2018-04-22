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
        @onSubmitClick="submitClick"
        @onCancelClick="show_modal=false">
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
        { title: "DocumentId", key: "documentId" },
        { title: "Version", key: "version" },
        { title: "CreationDate", key: "creationDate" },
        { title: "LastModificationDate", key: "lastModificationDate"}
      ],
      datas: [],
      formfields: [
        { title: "DocumentId", key: "documentId", type: "text" },
        //{ title: "Version", key: "version", type: "text" },
        //{ title: "CreationDate", key: "creationDate", type: "text" },
        //{ title: "LastModificationDate", key: "lastModificationDate", type: "text" },
      ],
      formdata: {},
      defaultSortKey: "documentId",
      hiddenTable: true,
      show_modal: false,
    };
  },

  created() {
    http.get(config.getMongoDocument).then(({ data }) => {
        this.datas = data;
        this.hiddenTable = false;
    });
  },

  methods: {
    rowClick(row, selectedRows) {
      this.formdata = JSON.parse(JSON.stringify(row));
      this.show_modal = true;
    },
    addClick() {
      this.formdata = {};
      this.show_modal = true;
    },
    submitClick() {
      this.show_modal = false;
      console.log(this.formdata);
    },
  }
};
</script>