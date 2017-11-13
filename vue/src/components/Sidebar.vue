<template>
  <div class="app-sidebar" :class="{'hidden-sidebar': !isSidebarVisible}">
    <div class="sidebar-link-container" v-for="item in menuitems" :key="item.title">
      <router-link class="sidebar-link" :to="item.path">
        {{item.title}}
      </router-link>
      <div class="sidebar-link-container" :class="{'hidden': hiddableMenu && !isSelectedMenu(item.path)}" v-for="child in item.children" :key="child.title">
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
      hiddableMenu: false,
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
      ]
    };
  },

  methods: {
    isSelectedMenu(input) {
      if (this.$route.path === "/") {
        return input === "/";
      }
      return this.$route.path.indexOf(input) === 0;
    }
  },

  computed: {
    ...mapState(["isSidebarVisible"])
  }
};
</script>

<style lang="scss" scoped>
.hidden-sidebar {
  width: 0;
}

.sidebar-link-container {
  padding-bottom: 5px;
  padding-top: 5px;
}

.sidebar-link {
  padding-left: 18px;
  font-size: 16px;
  color: black;
  text-decoration: none;
  &:hover {
    color: black;
    font-weight: 500;
  }
  &.router-link-exact-active {
    color: black;
    font-weight: 500;
  }
}

.sidebar-sublink {
  @extend .sidebar-link;
  color: grey;
  font-size: 13px;
}
</style>
