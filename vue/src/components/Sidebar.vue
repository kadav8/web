<template>
  <div class="app-sidebar unselectable" :class="{'hidden-sidebar': !isSidebarVisible}">
    <div class="sidebar-wrapper">
      <div v-for="item in menuitems" :key="item.title">
        <div class="sidebar-linktitle" @click="menuClick(item.path)">
          {{item.title}}
        </div>
        <div :class="{'hidden': hiddableMenu && !openedMenus.includes(item.path), 'selected': selectedMenu===item.path+child.path}" v-for="child in item.children" :key="child.title">
          <router-link :to="item.path+child.path">
            <div class="sidebar-link" @click="selectedMenu=item.path+child.path">{{child.title}}</div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="lasts-wrapper">
      <div v-show="selectedMenu==='/trackings/projects'" class="lasts-link" 
      v-for="project in lastOpenedProjects" :key="project.id" @click="toProject(project.id)"> {{project.name}} </div>
      <div v-show="selectedMenu==='/trackings/issues'" class="lasts-link" 
      v-for="issue in lastOpenedIssues" :key="issue.id" @click="toIssue(issue.id)"> {{issue.name}} </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      hiddableMenu: false,
      menuitems: [
        {
          title: "Home",
          path: "",
          children: [{ title: "Dashboard", path: "/" }]
        },
        {
          title: "Trackings",
          path: "/trackings",
          children: [
            { title: "Projects", path: "/projects" },
            { title: "Issues", path: "/issues" }
          ]
        },
        {
          title: "Users",
          path: "/users",
          children: [{ title: "Admins", path: "/admins" }]
        }
      ],
      openedMenus: [""],
      selectedMenu: null,
      selectedLink: null
    };
  },

  mounted() {
    let path = window.location.hash.substring(1);
    let main = path.split("/")[1];
    if (main === "") {
      this.openedMenus.push(main);
    } else {
      this.openedMenus.push("/" + main);
    }
    this.selectedMenu = path;

    if (this.selectedMenu.includes("trackings/project/")) {
      this.selectedMenu = "/trackings/projects";
    }
    else if (this.selectedMenu.includes("trackings/issue/")) {
      this.selectedMenu = "/trackings/issues";
    }
  },

  computed: {
    ...mapState(["isSidebarVisible", "lastOpenedProjects", "lastOpenedIssues"])
  },

  methods: {
    menuClick(input) {
      if (this.hiddableMenu) {
        if (this.openedMenus.includes(input)) {
          this.openedMenus = this.openedMenus.filter(title => title != input);
        } else {
          this.openedMenus.push(input);
        }
      }
    },
    toProject(id) {
      this.$router.push({ name: "toproject", params: { id: id } });
    },
    toIssue(id) {
      this.$router.push({ name: "toissue", params: { id: id } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";

.app-sidebar {
  border-right: 1px solid $sidebar-bordercolor;
  white-space: nowrap;
}

.hidden-sidebar {
  width: 0;
}

.sidebar-linktitle {
  padding-top: 5px;
  padding-left: 18px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
}

.sidebar-link {
  padding-bottom: 5px;
  padding-top: 5px;
  padding-left: 18px;
  font-size: 15px;
  color: $light-black;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    background-color: $vlight-grey;
  }
}

.selected {
  background-color: $vligt-yellow;
}

.lasts-wrapper {
  background-color: $vvligt-yellow;
}

.lasts-link {
  padding: 5px;
  padding-left: 18px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  //color: $blue;
  font-weight: 400;
  &:hover {
    text-decoration: underline;
  }
}
.selected-link {
  font-weight: 600;
}
</style>
