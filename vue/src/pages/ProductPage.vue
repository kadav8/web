<template>
  <div class="app-container">
    <apptable :headers="headers" :data="datas" :defaultSortKey="defaultSortKey"></apptable>
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
        { title: "Name", key: "name" },
        { title: "Manufacturer", key: "manufacturer" },
        { title: "Price", key: "price" },
        { title: "Status", key: "status" },
        { title: "Adding date", key: "addingDate" }
      ],
      datas: [
        {
          id: "1",
          name: "Nintendo Switch",
          manufacturer: "Nintendo",
          price: 120000,
          status: "Active",
          addingDate: "2017/03/19"
        },
        {
          id: "2",
          name: "Nintendo Switch",
          manufacturer: "Nintendo",
          price: 120000,
          status: "Active",
          addingDate: "2017/03/19"
        },
        {
          id: "7",
          name: "Nintendo Switch",
          manufacturer: "Nintendo",
          price: 120000,
          status: "Active",
          addingDate: "2017/03/19"
        },
        {
          id: "8",
          name: "Nintendo Switch",
          manufacturer: "Nintendo",
          price: 120000,
          status: "Active",
          addingDate: "2017/03/19"
        },
        {
          id: "9",
          name: "Nintendo Switch",
          manufacturer: "Nintendo",
          price: 120000,
          status: "Active",
          addingDate: "2017/03/19"
        },
        {
          id: "10",
          name: "Nintendo Switch",
          manufacturer: "Nintendo",
          price: 120000,
          status: "Active",
          addingDate: "2017/03/19"
        },
        {
          id: "11",
          name: "Nintendo Wii U",
          manufacturer: "Nintendo",
          price: 80000,
          status: "Inactive",
          addingDate: "2010/11/11"
        },
        {
          id: "12",
          name: "Nintendo Wii U",
          manufacturer: "Nintendo",
          price: 80000,
          status: "Inactive",
          addingDate: "2010/11/11"
        },
        {
          id: "6",
          name: "Nintendo Wii U",
          manufacturer: "Nintendo",
          price: 80000,
          status: "Inactive",
          addingDate: "2010/11/11"
        },
        {
          id: "5",
          name: "Nintendo Wii U",
          manufacturer: "Nintendo",
          price: 80000,
          status: "Inactive",
          addingDate: "2010/11/11"
        },
        {
          id: "4",
          name: "Nintendo Wii U",
          manufacturer: "Nintendo",
          price: 80000,
          status: "Inactive",
          addingDate: "2010/11/11"
        },
        {
          id: "3",
          name: "Nintendo Wii U",
          manufacturer: "Nintendo",
          price: 80000,
          status: "Inactive",
          addingDate: "2010/11/11"
        }
      ],
      defaultSortKey: "id"
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
