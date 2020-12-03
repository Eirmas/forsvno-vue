<template>
  <div
    class="podcast__iframe"
  >
    <iframe
      ref="iframe"
      id="iframe"
      width="0"
      height="0"
      src="https://embed.acast.com/forsvaret/deringenandrevilfly-2-2-"
      scrolling="no"
      frameborder="0"
      style="border:none;overflow:hidden;"
    >
    </iframe>
  </div>
</template>

<script>
import { Player } from "player.js";
import EventBus from "../../event-bus.es6";

export default {
  name: "AcastIframe",
  props: {
  },
  mounted() {
    window.addEventListener(
      "message",
      (event) => {
        this.handler(event.data);
      },
      false
    );
  },
  data: () => ({
    playing: false,
    progress: null
  }),
  created() {
    EventBus.$on("podcast__play", this.play);
    EventBus.$on("podcast__pause", this.pause);
  },
  beforeDestroy() {
    EventBus.$off("podcast__play");
    EventBus.$off("podcast__pause");
  },
  methods: {
    handler(event) {
      const eventName = event.eventName;
      console.log(event);

      if (eventName === "postmessage:on:play") {
        this.getDuration();
        this.progress = setInterval(this.getProgress, 500);
        this.setVolume();
        EventBus.$emit("podcast__playing", true);
      } else if (eventName === "postmessage:on:pause") {
        clearInterval(this.progress);
        EventBus.$emit("podcast__playing", false);
      } else if (eventName === "postmessage:get:duration") {
        EventBus.$emit("podcast__duration", event.data.duration);
      } else if (eventName === "postmessage:get:timeupdate") {
        EventBus.$emit("podcast__timeupdate", event.data.timeupdate);
      }
    },
    play() {
      const player = new Player("iframe");
      console.log(player);
      player.on("ready", () => {
        player.on("play", () => {
          console.log("play");
        });

        player.getDuration((duration) => console.log(duration));

        if (player.supports("method", "mute")) {
          player.mute();
        }

        player.play();
      });
      /* this.post({ eventName: "postmessage:do:play" }); */
    },
    pause() {
      this.post({ eventName: "postmessage:do:pause" });
    },
    load() {
      this.post({ eventName: "postmessage:do:load" });
    },
    loadMeta() {
      this.post({ eventName: "postmessage:do:loadmetadata" });
    },
    setVolume() {
      this.post({ eventName: "postmessage:do:setVolume", value: 0.5 });
    },
    getDuration() {
      this.post({ eventName: "postmessage:get:duration" });
    },
    getTimeUpdate() {
      this.post({ eventName: "postmessage:get:timeupdate" });
    },
    post(message) {
      const iframe = this.$refs.iframe;
      if (iframe) {
        iframe.contentWindow.postMessage(JSON.stringify(message), "*");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .podcast__iframe {
    display: none;
  }
</style>
