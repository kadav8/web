<template>
    <div class="orderListContainer">
        <div class="orderContainer" v-for="item in datas">
            <order></order>
        </div>
    </div>
</template>

<script>
import order from "./Order.vue";

export default {
  components: { order },

    props: {
        datas: Array
    },
};
</script>

<style lang="scss" scoped>
.orderListContainer {
}

.orderContainer {
    margin-bottom: 10px;
}
</style>