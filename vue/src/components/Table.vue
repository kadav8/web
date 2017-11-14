<template>
  <div class="maxheight">
    <div v-show="datas.length > 0" class="table-controller unselectable">
      <span class="input-span"> Search <input name="query" v-model="filterKey"> </span>
      <span class="input-span">
        Show
        <select v-model="pageSizeText">
          <option>10</option>
          <option>20</option>
          <option>25</option>
          <option>50</option>
          <option>All</option>
        </select>
      </span>
      <span class="page-span"> {{ pageNumber }} / {{ maxPage }} [ {{ filteredLength }} ] </span>
      <button class="pager-button" @click="first">
        <i class="fa fa-angle-double-left" aria-hidden="true"></i>
      </button>
      <button class="pager-button" @click="prev">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
      </button>
      <button class="pager-button" @click="next">
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </button>
      <button class="pager-button" @click="last">
        <i class="fa fa-angle-double-right" aria-hidden="true"></i>
      </button>
    </div>
    <table class="unselectable maxheight">
      <thead>
        <tr>
          <th v-for="item in headers" :key="item.key" @click="sortBy(item.key)" :style="{ width: item.width }" :class=item.classes>
            {{ item.title }}
            <span class="arrow" :class="{'asc': (sortKey === item.key && sortOrder === 1), 'dsc': (sortKey === item.key && sortOrder === -1)}"></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="datarow" v-for="(entry, index) in filteredData" :key="index">
          <td v-for="header in headers" :key="header.key" :style="{ width: header.width }" :class=header.classes>
            {{ entry[header.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script src="./js/table.js">
</script>

<style lang="scss" scoped>
@import "../styles/table.scss";
</style>
