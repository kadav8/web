<template>
  <div style="overflow-x:auto;">
    <table>
      <thead>
        <tr>
          <th v-for="item in headers" :key="item.id">
            {{ item.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in datas" :key="index">
          <td v-for="header in headers" :key="header.key">
            {{ entry[header.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "apptable",

  props: {
    headers: Array,
    datas: Array
  }
};
</script>

<style lang="sass" scoped>
@import "../styles/colors.scss";

table {
    border-collapse: collapse;
    width: 100%;
    font-size: 14px;
}

thead {
  background-color: #F5F5F5;
}

td, th {
    border: 1px solid $light-grey;
    text-align: left;
    padding: 5px;
}

tr {
    &:hover {
      background-color: #F5F5F5;
    }
}
</style>

