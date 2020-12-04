<template>
  <div
    class="podcast__iframe"
  >
    <iframe
      ref="iframe"
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
    state: {
      paused: Boolean,
      muted: Boolean,
      volume: Number,
      duration: Number,
      time: Number
    }
  },
  created() {
    EventBus.$on("podcast__play", this.play);
    EventBus.$on("podcast__pause", this.pause);
    EventBus.$on("podcast__mute", this.mute);
    EventBus.$on("podcast__unmute", this.unmute);
  },
  mounted() {
    const iframe = this.$refs.iframe;
    this.player = new Player(iframe);
    console.log(this.player);
    this.player.on("ready", () => {
      this.player.on("play", () => {
        this.state.paused = false;
      });
      this.player.on("pause", () => {
        this.state.paused = true;
      });
      this.player.on("timeupdate", (update) => {
        this.state.duration = update.duration;
        this.state.time = update.seconds;
      });
    });
  },
  data: () => ({
    player: null
  }),
  watch: {
    "state.volume": function (value) {
      this.setVolume(value / 100);
    }
  },
  methods: {
    play() {
      this.player.play();
    },
    pause() {
      this.player.pause();
    },
    mute() {
      this.state.muted = true;
      this.player.mute();
    },
    unmute() {
      this.state.muted = false;
      this.player.unmute();
    },
    setVolume(value) {
      this.player.setVolume(value);
    },
    getDuration() {
      this.player.getDuration((value) => {
        this.state.duration = value;
      });
    },
    getCurrentTime() {
      this.player.getCurrentTime((value) => {
        this.state.time = value;
      });
    }
  },
  beforeDestroy() {
    EventBus.$off("podcast__play");
    EventBus.$off("podcast__pause");
    EventBus.$off("podcast__mute");
    EventBus.$off("podcast__unmute");
  }
};
</script>
<style lang="scss" scoped>
  .podcast__iframe {
    display: none;
  }
</style>
