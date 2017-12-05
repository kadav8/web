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
  margin: 20px;
}

.title {
  font-size: 12px;
  color: black;
  font-weight: 600;
}

.info {
  font-size: 40px;
  color: black;
  font-weight: 600;
}
</style>
