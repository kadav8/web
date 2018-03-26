<template>
  <div class="app-container">
    <progressbar v-show="hiddenTable"></progressbar>

    <div class="info-container">
      <div class="project-title">
        <span class="project-name">{{projectName}}</span> ( id: {{projectId}} )</div>
      <div>{{summary}}</div>

      <div><br></div>
      <div>type: Business</div>
      <div>client: Apple</div>
      <div>status: Active</div>
      <div>adding date: 2016/11/11</div>

      <div><br></div>
      <div>issues: 200</div>
      <div>opened issues: 33</div>
      <div>active bug: 12</div>

      <div class="title"> Users </div>
      <div><span class="activity-name">Harry Potter</span> (Lead)</div>
      <div class="activity-name">Hermione Granger</div>
      <div class="activity-name">Ronald Weasley</div>

      <div class="title"> Activity </div>
      <div class="activity"><span class="activity-name">Harry Potter</span> started progress on <span class="activity-id">UNEDM-135</span></div>
      <div class="activity"><span class="activity-name">Hermione Granger</span> started progress on <span class="activity-id">UNEDM-134</span></div>
      <div class="activity"><span class="activity-name">Ronald Weasley</span> changed the Assignee to 'Kaszányi Dávid' on <span class="activity-id">UNEDM-136</span></div>
      <div class="activity"><span class="activity-name">Harry Potter</span> started progress on <span class="activity-id">UNEDM-135</span></div>
      <div class="activity"><span class="activity-name">Hermione Granger</span> started progress on <span class="activity-id">UNEDM-134</span></div>
    </div>

    <apptable class="apptable-smaller" 
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
      projectId: null,
      projectName: null,
      summary: null,
      headers: [
        { title: "Name", key: "name", bclasses: "name-column" },
        { title: "Summary", key: "summary", width: "30%", bclasses: "bold" },
        { title: "Priority", key: "priority" },
        { title: "Type", key: "type" },
        { title: "Status", key: "status" },
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
        { title: "Adding Date", key: "addDate", type: "text" }
      ],
      formdata: {},
      defaultSortKey: "id",
      hiddenTable: true,
      show_modal: false,
      selectedRow: null
    };
  },

  created() {
    this.$store.commit('setSidebarTitle', 'Projects');
  },

  mounted() {
    let path = window.location.hash.substring(1);
    let patharray = path.split("/");
    this.buildPage(patharray[patharray.length - 1]);
  },

  beforeRouteUpdate(to, from, next) {
    this.buildPage(to.params.id);
    next();
  },

  methods: {
    buildPage(id) {
      this.projectId = id;
      this.projectName = "UNI-Disposal";
      this.summary =
        "A Unicredit Bank EDocManagement projektje során bevezetett imaging megoldás hatására a megfelelően digitalizált, és hitelesen archivált dokumentumok papír alapú példányai feleslegessé válnak. "
        + " Az ilyen papír alapú dokumentumok megsemmisítéséhez igény keletkezett egy olyan támogató rendszerre, ami a szóban forgó papír alapú dokumentumok selejtezését támogatja. Ez a Disposal alkalmazás.";
      http.get(config.getAllIssuesUrl).then(({ data }) => {
        this.datas = data.items;
        this.hiddenTable = false;
      });
      // TODO : this.$store.commit('pushLastOpenedProjects', {id:row.id, name:row.name});
    },
    rowClick(row, selectedRows) {
      if (selectedRows.length === 0) {
        this.selectedRow = null;
      } else {
        this.selectedRow = selectedRows[selectedRows.length - 1];
      }
    },
    editClick() {
      this.formdata = JSON.parse(JSON.stringify(this.selectedRow));
      this.show_modal = true;
    },
    openClick(selectedRows) {
      for (var i = 0; i < selectedRows.length; i++) {
        let row = selectedRows[i];
        this.$store.commit("pushLastOpenedIssues", {
          id: row.id,
          name: row.name
        });
      }
    },
    deleteClick() {
      this.$alertError("A törlés még nem működik!");
    },
    addClick() {
      this.formdata = {};
      this.show_modal = true;
    },
    submitClick() {
      this.show_modal = false;
    },
    cellClick(key, value, row) {
      if (key === "name") {
        this.$store.commit("pushLastOpenedIssues", {
          id: row.id,
          name: row.name
        });
        this.$router.push({ name: "toissue", params: { id: row.id } });
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

.info-container {
  font-size: 12px;
  width: 30%;
  margin-bottom: 10px;
  float: right;
  max-height: 97%;
  overflow: auto;
  padding-left: 1em;
}

.project-title {
  padding-bottom: 5px;
}
.project-name {
  font-size: 20px;
  font-weight: 500;
}
.title {
  font-size: 20px;
  font-weight: 500;
  padding-top: 20px;
  padding-bottom: 5px;
}
.activity {
  padding-bottom: 10px;
}
.activity-name {
  font-weight: 500;
  color: $blue;
}
.activity-id {
  color: $blue;
}

.apptable-smaller {
  width: 70%;
  float: left;
  //padding-left: 1em;
}
</style>
