<template>
    <div class="infobox">
        <div class="title">{{title}}</div>
        <div class="info">{{info}}</div>
    </div>
</template>

<script>
export default {
  props: {
    title: String,
    info: String
  },

  data() {
    return {};
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/colors.scss";

.infobox {
  background-color: $ligt-yellow;
  padding: 20px;
  margin-right: 20px;
}

.last-infobox {
  margin-right: 0px;
}

.title {
  font-size: 20px;
  color: white;
  font-weight: 300;
}

.info {
  font-size: 50px;
  color: white;
  font-weight: 500;
}
</style>
