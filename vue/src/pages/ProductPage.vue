<template>
  <div class="app-container">
    <apptable :headers="headers" :datas="datas"></apptable>
  </div>
</template>

<script>
import http from "../http.js";
import apptable from "../components/Table.vue";

export default {
  components: { apptable },

  data() {
    return {
      headers: [
        { title: "Id", key: "id" },
        { title: "Name", key: "name"  },
        { title: "Manufacturer", key: "manufacturer"  },
        { title: "Price", key: "price"  },
        { title: "Status", key: "status"  },
        { title: "Adding date", key: "addingDate"  }
      ],
      datas: [
        { id: "12345", name: "Nintendo Switch", manufacturer: "Nintendo", price: 120000, status: "Active", addingDate: "2017/03/19" },
        { id: "12346", name: "Nintendo Wii U", manufacturer: "Nintendo", price: 80000, status: "Inactive", addingDate: "2010/11/11" }
      ]
    };
  },

  created() {
    this.fetch();
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
