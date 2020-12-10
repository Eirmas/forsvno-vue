<template>
  <div
    class="media-player__iframe"
  >
    <iframe
      ref="iframe"
      :src="src"
      width="0"
      height="0"
      data-cookiescript="accepted"
      alt=""
      data-cookiecategory="functionality"
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
    /*
     * Source of iframe
     */
    src: String,
    /*
     * State of player, for parent file
     */
    state: {
      paused: Boolean,
      muted: Boolean,
      volume: Number,
      duration: Number,
      time: Number
    }
  },
  created() {
    EventBus.$on("media-player__play", this.play);
    EventBus.$on("media-player__pause", this.pause);
    EventBus.$on("media-player__mute", this.mute);
    EventBus.$on("media-player__unmute", this.unmute);
    EventBus.$on("media-player__rewind", this.setCurrentTime);
  },
  mounted() {
    const iframe = this.$refs.iframe;
    this.player = new Player(iframe);

    // player.js watchers
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
    /*
     * Functions needed to operate player
     * All are a part of player.js framework
     */
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
    },
    setCurrentTime(seconds) {
      this.player.setCurrentTime(seconds);
    }
  },
  beforeDestroy() {
    EventBus.$off("media-player__play");
    EventBus.$off("media-player__pause");
    EventBus.$off("media-player__mute");
    EventBus.$off("media-player__unmute");
    EventBus.$off("media-player__rewind");
  }
};
</script>
<style lang="scss" scoped>
  .media-player__iframe {
    display: none;
  }
</style>
