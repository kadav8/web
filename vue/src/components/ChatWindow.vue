<template>
  <div class="chat-wrapper" :class="{ 'shorter-wrapper': !showContent }">
    <div class="chat-header unselectable" @click="showContent=!showContent">
      {{headerText}}
    </div>
    <div class="chat-content" v-show="showContent">
      <div class="messages-area" id="messages-area-id">
        <div class="message" :key="index" v-for="(item, index) in msg">
          <strong>{{item.user}}</strong>
          <span class="time-span">{{item.time}}</span>
          <br/> {{item.text}} </div>
      </div>
      <div class="textbox-area" contenteditable="true" @keyup.enter="submit"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      showContent: false,
      headerText: "chat",
      actual: "",
      msg: [
        { user: "Harry", text: "Te vagy az?", time: "2017/01/12 13:20" },
        { user: "Steve", text: "Nem!", time: "2017/01/12 13:23" },
        { user: "Harry", text: "Akkor meg ki vagy? Velem ne szórakozz, mert megbánod! Meg fogod bánni!", time: "2017/01/12 13:25" }
      ],
      username: "Harry"
    };
  },

  methods: {
    submit(event) {
      this.msg.push({
        user: this.username,
        text: event.target.innerText.trim(),
        time: "2017/01/12 13:20"
      });
      event.target.innerText = "";
      this.scrollToBottom();
    },
    scrollToBottom() {
      var element = document.getElementById("messages-area-id");
      element.scrollTop = element.scrollHeight;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";

.chat-wrapper {
  position: fixed;
  width: 400px;
  font-size: 12px;
  right: 50px;
  bottom: 0px;
  z-index: 8888;
  border: 1px solid $light-grey;
  border-radius: 4px 4px 0px 0px;
}
@media screen and (max-width: 600px) {
  .chat-wrapper {
    width: 300px;
  }
}
@media screen and (max-width: 400px) {
  .chat-wrapper {
    width: 250px;
  }
}
@media screen and (max-width: 325px) {
  .chat-wrapper {
    display: none;
  }
}

.shorter-wrapper {
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

.messages-area {
  padding: 2px;
  height: 360px;
  overflow-y: auto;
  overflow-x: hidden;
}
.message {
  word-wrap: break-word;
  padding: 2px;
}

.time-span {
  font-size: 10px;
  color: $grey;
}

.textbox-area {
  border-top: 1px solid $light-grey;
  padding: 2px;
  height: 40px;
}
</style>