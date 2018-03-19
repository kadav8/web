<template>
    <div class="chat-wrap" :class="{ 'shorter-wrap': !showContent }">
        <div class="chat-header" @click="showContent=!showContent">
            chat
        </div>
        <div v-show="showContent" class="chat-content">
            <div class="carea">
                <div class="message" :style="{ width: item.length*5 + 100 + 'px' }" :key="index" v-for="(item, index) in msg"> {{item}} </div>
            </div>
            <div class="tarea" contenteditable="true" @keyup.enter="submit"></div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      showContent: true,
      actual: "",
      msg: ["Te vagy az?", "Nem!"]
    };
  },

  methods: {
    submit(event) {
      this.msg.push(event.target.innerText.trim());
      event.target.innerText = "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";

.chat-wrap {
  position: fixed;
  right: 50px;
  bottom: 0px;
  z-index: 8888;
  border: 1px solid $light-grey;
  width: 400px;
  border-radius: 4px 4px 0px 0px;
  font-size: 12px;
}

.shorter-wrap {
  width: 150px;
}

.chat-header {
  background-color: $blue;
  padding: 2px;
  padding-left: 5px;
  border-radius: 4px 4px 0px 0px;
  cursor: pointer;
  color: white;
  font-size: 13px;
  font-weight: 500;
}

.chat-content {
  background-color: white;
}

.carea {
  padding: 2px;
  height: 360px;
  overflow-y: auto;
  overflow-x: hidden;
}

.tarea {
  border-top: 1px solid $light-grey;
  padding: 2px;
  height: 40px;
}

textarea {
  border: 0px solid $light-grey;
}

.message {
  background-color: $vvlight-grey;  
  word-wrap: break-word;
  padding: 5px;
  border-radius: 10px;
  margin: 3px;
  max-width: 385px;
}
</style>