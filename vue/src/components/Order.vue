<template>
    <div class="orderContainer">
        <div class="orderHeader">
            Kovács János - 120300
        </div>
        <div class="orderBody">
            Body
        </div>
    </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";

.orderContainer {
    width: 100%;
    border: 1px solid $light-grey;
}

.orderHeader {
    width: inherit;
    background-color: $vlight-grey;
    border-bottom: 1px solid $light-grey;
    padding: 3px;
    font-weight: 400;
    font-size: 18px;
}

.orderBody {
    width: inherit;
    padding: 3px;
}
</style>