<template>
  <div class="app-sidebar unselectable" :class="{'hidden-sidebar': !isSidebarVisible, 'unselectable': true}">
    <div class="sidebar-link-container" v-for="item in menuitems" :key="item.title">

      <div class="sidebar-link" @click="menuClick(item.title)">
        {{item.title}}
      </div>

      <div class="sidebar-link-container" :class="{'hidden': hiddableMenu && !openedMenus.includes(item.title), 'selected': selectedMenu===child.title}" v-for="child in item.children" :key="child.title">
        <router-link class="sidebar-sublink" :to="item.path+child.path">
          <span @click="selectedMenu=child.title">{{child.title}}</span>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      hiddableMenu: true,
      menuitems: [
        {
          title: "HOME",
          path: "",
          children: [{ title: "Dashboard", path: "/" }]
        },
        {
          title: "CATALOG",
          path: "/catalog",
          children: [
            { title: "Products", path: "/products" },
            { title: "Categories", path: "/categories" },
            { title: "Media", path: "/media" }
          ]
        },
        {
          title: "ORDERS",
          path: "/orders",
          children: [
            { title: "Claims", path: "/claims" },
            { title: "Completed", path: "/completed" },
            { title: "Returned", path: "/returned" },
            { title: "Archived", path: "/archived" }
          ]
        },
        {
          title: "STATISTICS",
          path: "/statistics",
          children: [
            { title: "Sales", path: "/sales" },
            { title: "Reports", path: "/reports" },
            { title: "Traffic", path: "/traffic" },
            { title: "Views", path: "/views" }
          ]
        },
        {
          title: "CUSTOMERS",
          path: "/customers",
          children: [
            { title: "Messages", path: "/messages" },
            { title: "Users", path: "/users" },
            { title: "Newsletter", path: "/newsletter" },
            { title: "Carts", path: "/carts" }
          ]
        },
        {
          title: "SETTINGS",
          path: "/settings",
          children: [{ title: "Admins", path: "/admins" }]
        }
      ],
      openedMenus: ["HOME"],
      selectedMenu: ""
    };
  },

  methods: {
    isSelectedMenu(input) {
      if (this.$route.path === "/") {
        return input === "/";
      }
      return this.$route.path.indexOf(input) === 0;
    },
    menuClick(input) {
      if(this.openedMenus.includes(input)) {
        this.openedMenus = this.openedMenus.filter(title => title != input);
      } else {
        this.openedMenus.push(input);
      }
    }
  },

  computed: {
    ...mapState(["isSidebarVisible"])
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";

.hidden-sidebar {
  width: 0;
}

.sidebar-link-container {
  padding-bottom: 5px;
  padding-top: 5px;
  &:hover {
    //background-color: $vlight-grey;
  }
  &.router-link-exact-active {
    background-color: $vlight-grey;
  }
  .selected {
    background-color: $vlight-grey;
  }
}

.sidebar-link {
  padding-left: 18px;
  font-size: 13px;
  color: grey;
  text-decoration: none;
  font-weight: 700;
  &.router-link-exact-active {
    //text-decoration: underline;
  }
  &:hover {
    //text-decoration: underline;
  }
  cursor: pointer;
}

.sidebar-sublink {
  @extend .sidebar-link;
  color: #337ab7;
  font-weight: 600;
}


</style>
