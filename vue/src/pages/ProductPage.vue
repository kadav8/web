<template>
  <div class="app-container">
    <p>Products</p>
  </div>
</template>

<script>
import http from "../http.js";

export default {
  created() {
    this.fetch();
  },

  data() {
    return {
      headers: [
        { text: "Id", value: "id" },
        { text: "Name", value: "name" },
        { text: "Manufacturer", value: "manufacturer" },
        { text: "Price", value: "price" },
        { text: "Status", value: "status" },
        { text: "Adding date", value: "addDate" }
      ],
      items: []
    };
  },

  methods: {
    fetch() {
      /*http.getProducts().then(({ data }) => {
        this.items = data.items;
      });*/
    }
  }
};
</script>
