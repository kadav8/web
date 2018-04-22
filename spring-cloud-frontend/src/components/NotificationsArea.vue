<template>
  <div v-show="wsconnected" class="notifications-wrapper unselectable">
    <transition-group name="slide-fade" tag="div">
      <div :class="item.type" role="alert" :key="index" v-for="(item, index) in notifications" @click="hide(item)">
        <span> {{item.text}} </span>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
import config from "../config.js";
import http from "../http.js";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default {
  data() {
    return {
      notifications: [],
      stompClient: null,
      wsconnected: false
    };
  },

  created() {
    http.get(config.isNotificationsEnabled).then(({ data }) => {
      if (data) {
        console.log("Notifications is enabled!")
        let socket = new SockJS(config.webSocketEndpoint);
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, this.onConnect);
      } else {
        console.log("Notifications is disabled!")
      }
    });
  },

  methods: {
    onConnect(frame) {
      this.wsconnected = true;
      this.stompClient.subscribe(config.webSocketSubscribeUrl, this.onMessage);
    },

    onMessage(frame) {
      let msg = JSON.parse(frame.body);
      this.notifications.push(msg);
      setTimeout(() => {
        for (let i = 0; i < this.notifications.length; i++) {
          if (this.notifications[i] === msg) {
            this.notifications.splice(i, 1)
          }
        }
      }, 5000);
    },

    hide(item) {
      for (let i = 0; i < this.notifications.length; i++) {
        if (this.notifications[i] === item) {
          this.notifications.splice(i, 1);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";

.notifications-wrapper {
  position: fixed;
  right: 25px;
  bottom: 25px;
  z-index: 9999;
}

.success {
  background-color: $green;
  padding: 25px;
  padding-top: 15px;
  padding-bottom: 15px;
  color: white;
  border-radius: 4px;
  margin-bottom: 10px;
}

.error {
  background-color: $danger;
  padding: 25px;
  padding-top: 15px;
  padding-bottom: 15px;
  color: white;
  border-radius: 4px;
  margin-bottom: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>