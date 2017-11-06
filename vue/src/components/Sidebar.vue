<template>
  <div class="app-sidebar" :class="{'hidden-sidebar': !isSidebarVisible}">
    <div class="sidebar-link-container" v-for="item in menuitems" :key="item.title">
      <router-link class="sidebar-link" :class="{'router-link-exact-active': item.title === selectedMainMenu}" :to="item.path">
        <span @click="selectedMainMenu=item.title">{{item.title}}</span>
      </router-link>
      <div class="sidebar-link-container" :class="{'hidden': item.title !== selectedMainMenu}" v-for="child in item.children" :key="child.title">
        <router-link class="sidebar-sublink" :to="item.path+child.path">
          {{child.title}}
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
      menuitems: [
        { title: "Home", path: "/" },
        {
          title: "Catalog",
          path: "/catalog",
          children: [
            { title: "Products", path: "/products" },
            { title: "Categories", path: "/categories" },
            { title: "Media", path: "/media" }
          ]
        },
        {
          title: "Orders",
          path: "/orders",
          children: [
            { title: "Claims", path: "/claims" },
            { title: "Completed", path: "/completed" },
            { title: "Returned", path: "/returned" },
            { title: "Archived", path: "/archived" }
          ]
        },
        {
          title: "Statistics",
          path: "/statistics",
          children: [
            { title: "Sales", path: "/sales" },
            { title: "Reports", path: "/reports" },
            { title: "Traffic", path: "/traffic" },
            { title: "Views", path: "/views" }
          ]
        },
        {
          title: "Customers",
          path: "/customers",
          children: [
            { title: "Messages", path: "/messages" },
            { title: "Users", path: "/users" },
            { title: "Newsletter", path: "/newsletter" },
            { title: "Carts", path: "/carts" }
          ]
        },
        {
          title: "Settings",
          path: "/settings",
          children: [{ title: "Admins", path: "/admins" }]
        }
      ],
      selectedMainMenu: null
    };
  },

  created() {
    this.selectedMainMenu = this.menuitems[0].title;
  },

  computed: {
    ...mapState(["isSidebarVisible"])
  }
};
</script>

<style lang="scss" scoped>
.app-sidebar {
  transition: 0.5s;
}

.hidden-sidebar {
  width: 0;
  overflow-x: hidden;
}

.sidebar-link-container {
  padding-bottom: 5px;
  padding-top: 5px;
}

.sidebar-link {
  padding-left: 17px;
  font-size: 17px;
  color: grey;
  text-decoration: none;
  &:hover {
    color: black;
  }
  &.router-link-exact-active {
    color: black;
    font-weight: 500;
  }
}

.sidebar-sublink {
  @extend .sidebar-link;
  font-size: 13px;
}
</style>
