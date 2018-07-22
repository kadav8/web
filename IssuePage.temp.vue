<template>
  <div class="app-container">
   <div class="info-container" v-show="!hiddenTable">
      <div class="box">
        <div style="padding-bottom: 5px;">
          <span class="title">Issue: Issue </span>
        </div>
        Assignee : Assignee
      </div>

       <div class="box">
        <div>type:  test type</div>
        <div>reporter: test reportes</div>
        <div>status: test status</div>
        <div>assignee: test assignee</div>
        <div>adding date: 2010</div>
        <div>priority: test priority</div>
      </div>
        
      <div id="users" class="box">
        <div class="title"> Summary </div>
        <div><span class="activity-name">ez egy teszt leírás</span> </div>
      </div>

      <div>
        <span style="float: right; margin-left: 5px;">
          <button class="small-btn blue-btn" >Edit</button>
        </span>
      </div>
    </div>

   <comment_section
    class="comments-wrapper"
    :comments="comments"
    :issueId="issueId"
    :issue="issue"
    :name="account.firstName + ' ' + account.lastName">
   </comment_section>   

    <form_modal
      v-show="showModal" 
      :fields="formfields" 
      :formdata="formdata" 
      @onSubmitClick="submit" 
      @onCancelClick="showModal=false">
    </form_modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import http from "../http.js";
import config from "../config.js";
import form_modal from "../components/FormModal.vue";
import comment_section from "../components/CommentSection.vue";

export default {
  components: { form_modal, mapState, comment_section },
  computed: {
    ...mapState(["account"])
  },
  data() {
    return {
      issueId: null,
      username: "",
      comments: [],
      issue: null,
      showModal: false
    };
  },
  created() {
    this.$store.commit("setSidebarTitle", "Issues");
    this.comments = [{
      user: "Teszt Elek",
      sendDate: "2012.12.12 22:22",
      message: "Ez itt egy üzenet"
    },
    {
      user: "Teszt Elek",
      sendDate: "2012.12.13 11:11",
      message: "Ez itt egy másik üzenet"
    }];
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
    submit() {
      var request = {
        comment: this.formdata,
        user: this.account.firstName + " " + this.account.lastName
      };
      request.comment.issueId = this.issueId;
      request.issue.reporter = this.account.email;
      this.showModal = false;
    },
    buildPage(id) {
      this.issueId = id;
    }
  }
};
</script>
<style lang="scss">
@import "../styles/colors.scss";
@import "../styles/buttons.scss";

.comments-wrapper {
  width: 70%;
  float: left;
  padding-left: 1em; 
}
.info-container {
  font-size: 12px;
  width: 30%;
  float: left;
  max-height: 98%;
  overflow: auto;
}
.box {
  margin-bottom: 10px;
  border: 1px solid $table-border-color;
  padding: 8px;
}
.title {
  font-size: 20px;
  font-weight: 500;
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

@media screen and (max-width: 1320px) {
  .info-container {
    width: 100%;
    padding-bottom: 1em;
  }
  .comments-wrapper {
    width: 100%;
    padding-left: 0em;
  }
}
@media screen and (max-width: 300px) {
  .info-container {
    display: none;
  }
}
@media screen and (max-height: 750px) {
  #datas1,
  #datas2 {
    display: none;
  }
}
@media screen and (max-height: 560px) {
  #act {
    display: none;
  }
}
@media screen and (max-height: 350px) {
  #users {
    display: none;
  }
}
@media screen and (max-height: 300px) {
  .info-container {
    display: none;
  }
  .comments-wrapper {
    width: 100%;
    padding-left: 0em;
  }
}
@media screen and (max-width: 992px) {
  .hide-date {
    display: none;
  }
}
</style>