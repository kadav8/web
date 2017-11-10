<template>
  <div style="overflow-x:auto;">
    <table class="unselectable">
      <thead>
        <tr>
          <th v-for="item in headers" :key="item.key" @click="sortBy(item.key)">
            {{ item.title }}
            <span class="arrow" :class="{'asc': (sortKey === item.key && sortOrder === 1), 'dsc': (sortKey === item.key && sortOrder === -1)}"></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="datarow" v-for="(entry, index) in filteredData" :key="index">
          <td v-for="header in headers" :key="header.key">
            {{ entry[header.key] }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="100%">
            <button class="pager-button" @click="prev"> < </button>
            <button class="pager-button" @click="next"> > </button>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  name: "apptable",

  props: {
    headers: Array,
    data: Array,
    defaultSortKey: String
  },

  data() {
    return {
      sortKey: "",
      sortOrder: 1,
      pageSize: 5,
      pageNumber: 1
    };
  },

  created() {
    this.sortKey = this.defaultSortKey || "";
  },

  computed: {
    filteredData() {
      var sortKey = this.sortKey;
      var sortOrder = this.sortOrder;
      var data = this.data;
      if (sortKey) {
        data = data.sort(function(o1, o2) {
          let a = o1[sortKey];
          let b = o2[sortKey];
          if (!isNaN(a) && !isNaN(b)) {
            return (a - b) * sortOrder;
          }
          return (a === b ? 0 : a > b ? 1 : -1) * sortOrder;
        });
      }
      var from = (this.pageSize*(this.pageNumber-1));
      return data.slice(from,from+this.pageSize);
    }
  },

  methods: {
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder * -1;
      }
      this.sortKey = key;
    },
    prev() {
      this.pageNumber = this.pageNumber - 1;
      if(this.pageNumber < 1) {
        this.pageNumber = 1;
      }
    },
    next() {
      this.pageNumber = this.pageNumber + 1;
      var maxPage = Math.ceil(this.data.length / this.pageNumber);
      if(this.pageNumber > maxPage) {
        this.pageNumber = maxPage;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";

table {
  border-collapse: collapse;
  width: 100%;
  font-size: 14px;
  cursor: pointer;
}

thead {
  background-color: $table-head-bgcolor;
  color: $table-head-textcolor;
}

td,
th {
  border: 1px solid $table-border-color;
  text-align: left;
  padding: 5px;
}

tfoot * {
  text-align: right;
}

.datarow {
  &:hover {
    background-color: $table-hover-color;
  }
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 4px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}

.arrow.asc {
  border-bottom: 5px solid #fff;
}

.arrow.dsc {
  border-top: 5px solid #fff;
}

.pager-button {
  padding-left: 10px;
  padding-right: 10px;
  font-size: 20px;
  font-weight: bold;
  color: $table-border-color;
  &:hover {
    color: grey;
  }
}
</style>
